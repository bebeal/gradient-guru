// TODO: Clean this up

import canvasSize from "canvas-size"
import { PngHelpers } from "./png";
import { Editor, SVG_PADDING, TLShape, TLShapeId } from "@tldraw/editor";
import { ImageConfig, defaultImageConfig } from "@/hooks";

export type TLCopyType = 'svg' | 'png' | 'jpeg' | 'json'
export type TLExportType = 'svg' | 'png' | 'jpeg' | 'json' | 'webp'
export type CanvasMaxSize = {
	maxWidth: number
	maxHeight: number
	maxArea: number
}

let maxSizePromise: Promise<CanvasMaxSize> | null = null

export const calculateBrowserCanvasMaxSize = async (): Promise<CanvasMaxSize> => {
	const maxWidth = await canvasSize.maxWidth({ usePromise: true })
	const maxHeight = await canvasSize.maxHeight({ usePromise: true })
	const maxArea = await canvasSize.maxArea({ usePromise: true })
	return {
		maxWidth: maxWidth.width,
		maxHeight: maxHeight.height,
		maxArea: maxArea.width * maxArea.height,
	}
}

export const getBrowserCanvasMaxSize = ()  =>{
	if (!maxSizePromise) {
		maxSizePromise = calculateBrowserCanvasMaxSize()
	}

	return maxSizePromise;
}


export const downloadDataURLAsFile = (dataUrl: string, filename: string) => {
	const link = document.createElement('a');
	link.href = dataUrl;
	link.download = filename;
	link.click();
}

export const getTextBoundingBox = (text: SVGTextElement) => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.appendChild(text);

	document.body.appendChild(svg);
	const bbox = text.getBoundingClientRect();
	document.body.removeChild(svg);

	return bbox;
}

export const getExportSvgElement: any = async (editor: Editor, ids: TLShapeId[], imageConfig?: Partial<ImageConfig>) => {
	const svg = editor.getSvg(ids, imageConfig);
	if (!svg) throw new Error('Could not construct SVG.');

	return await svg;
}

export const getSvg = (editor: Editor, shapes: TLShapeId[] | TLShape[], options: Partial<ImageConfig> = defaultImageConfig) => {
  if (!window.document) throw Error('No document');

  const ids = typeof shapes[0] === 'string' ? (shapes as TLShapeId[]) : (shapes as TLShape[]).map((s) => s.id);
  if (ids.length === 0) return;

  const {
    scale = 1,
    background = false,
    padding = SVG_PADDING,
    preserveAspectRatio = false,
  } = options;

  // ---Figure out which shapes we need to include
  const shapeIdsToInclude = editor.getShapeAndDescendantIds(ids)
  const renderingShapes = editor.getUnorderedRenderingShapes(false).filter(({ id }) =>
			shapeIdsToInclude.has(id)
		)

    // --- Common bounding box of all shapes
		let bbox = null
		if (options.bounds) {
			bbox = options.bounds
		} else {
			for (const { maskedPageBounds } of renderingShapes) {
				if (!maskedPageBounds) continue
				if (bbox) {
					bbox.union(maskedPageBounds)
				} else {
					bbox = maskedPageBounds.clone()
				}
			}
		}


  
};

export const getSvgAsString = (svg: SVGElement) => {
	const clone = svg.cloneNode(true) as SVGGraphicsElement;

	svg.setAttribute('width', +svg.getAttribute('width')! + '');
	svg.setAttribute('height', +svg.getAttribute('height')! + '');

	const out = new XMLSerializer()
		.serializeToString(clone)
		.replaceAll('&#10;      ', '')
		.replaceAll(/((\s|")[0-9]*\.[0-9]{2})([0-9]*)(\b|"|\))/g, '$1');

	return out
}

export const getExportedSvgBlob = async (editor: Editor, ids: TLShapeId[]) => {
	return new Blob([getSvgAsString(await getExportSvgElement(editor, ids))], {
		type: 'text/plain',
	});
}

export const getSvgAsDataUrlSync = (node: SVGElement) => {
	const svgStr = new XMLSerializer().serializeToString(node);
	const base64SVG = window.btoa(decodeURIComponent(encodeURIComponent(svgStr)));
	return `data:image/svg+xml;base64,${base64SVG}`;
}

export const getSvgAsDataUrl = async (svg: SVGElement) => {
	const clone = svg.cloneNode(true) as SVGGraphicsElement;
	clone.setAttribute('encoding', 'UTF-8"');

	const fileReader = new FileReader();
	const imgs = Array.from(clone.querySelectorAll('image')) as SVGImageElement[];

	for (const img of imgs) {
		const src = img.getAttribute('xlink:href');
		if (src) {
			if (!src.startsWith('data:')) {
				const blob = await (await fetch(src)).blob();
				const base64 = await new Promise<string>((resolve, reject) => {
					fileReader.onload = () => resolve(fileReader.result as string);
					fileReader.onerror = () => reject(fileReader.error);
					fileReader.readAsDataURL(blob);
				})
				img.setAttribute('xlink:href', base64);
			}
		}
	}

	return getSvgAsDataUrlSync(clone);
}

export const getSvgAsImage = async (svg: SVGElement, isSafari: boolean, options: Partial<ImageConfig>) => {
	const { type, quality, scale=1 } = options

	const width = +svg.getAttribute('width')!
	const height = +svg.getAttribute('height')!
	let scaledWidth = width * scale
	let scaledHeight = height * scale

	const dataUrl = await getSvgAsDataUrl(svg)

	const canvasSizes = await getBrowserCanvasMaxSize()
	if (width > canvasSizes.maxWidth) {
		scaledWidth = canvasSizes.maxWidth
		scaledHeight = (scaledWidth / width) * height
	}
	if (height > canvasSizes.maxHeight) {
		scaledHeight = canvasSizes.maxHeight
		scaledWidth = (scaledHeight / height) * width
	}
	if (scaledWidth * scaledHeight > canvasSizes.maxArea) {
		const ratio = Math.sqrt(canvasSizes.maxArea / (scaledWidth * scaledHeight))
		scaledWidth *= ratio
		scaledHeight *= ratio
	}

	scaledWidth = Math.floor(scaledWidth)
	scaledHeight = Math.floor(scaledHeight)
	const effectiveScale = scaledWidth / width

	const canvas = await new Promise<HTMLCanvasElement | null>((resolve) => {
		const image = new Image()
		image.crossOrigin = 'anonymous'

		image.onload = async () => {
			// safari will fire `onLoad` before the fonts in the SVG are
			// actually loaded. just waiting around a while is brittle, but
			// there doesn't seem to be any better solution for now :( see
			// https://bugs.webkit.org/show_bug.cgi?id=219770
			if (isSafari) {
				await new Promise((resolve) => setTimeout(resolve, 250))
			}

			const canvas = document.createElement('canvas') as HTMLCanvasElement
			const ctx = canvas.getContext('2d', { willReadFrequently: true })!

			canvas.width = scaledWidth
			canvas.height = scaledHeight

			ctx.imageSmoothingEnabled = options.imageSmoothingEnabled || true;
			ctx.imageSmoothingQuality = options.imageSmoothingQuality || 'high';
			ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight)

			URL.revokeObjectURL(dataUrl)

			resolve(canvas)
		}

		image.onerror = () => {
			resolve(null)
		}

		image.src = dataUrl
	})

	if (!canvas) return null

	const blob = await new Promise<Blob | null>((resolve) =>
		canvas.toBlob(
			(blob) => {
				if (!blob) {
					resolve(null)
				}
				resolve(blob)
			},
			'image/' + type,
			quality
		)
	)

	if (!blob) return null

	const view = new DataView(await blob.arrayBuffer())
	return PngHelpers.setPhysChunk(view, effectiveScale, {
		type: 'image/' + type,
	})
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
	return new Promise((resolve, _) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result as string)
		reader.readAsDataURL(blob)
	})
}

export const getExportedImageBlob = async (editor: Editor, ids: TLShapeId[], options: Partial<ImageConfig>) => {
	return await getSvgAsImage(await getExportSvgElement(editor, ids, options), editor.environment.isSafari, options)
}

export const getCanvasImageUrl = async (editor: Editor, ids: TLShapeId[], options: Partial<ImageConfig>) => {
  return URL.createObjectURL((await getExportedImageBlob(editor, ids, options))!);
}

export const getDataUrl = async (editor: Editor, ids: TLShapeId[], options: Partial<ImageConfig>): Promise<string> => {
  const svg = await getExportSvgElement(editor, ids, options);
	return await getSvgAsDataUrl(svg)
};

export const fallbackWriteTextAsync = async (getText: () => Promise<string>) => {
	if (!(navigator && navigator.clipboard)) return
	navigator.clipboard.writeText(await getText())
}

export async function getSelectionAsImageDataUrl(editor: Editor) {
	const svg = await editor.getSvg(editor.getSelectedShapes())
	if (!svg) throw new Error('Could not get SVG')

	const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

	const blob = await getSvgAsImage(svg, IS_SAFARI, {
		type: 'png',
		quality: 1,
		scale: 1,
	})

	if (!blob) throw new Error('Could not get blob')
	return await blobToBase64(blob)
}

	// /**
	//  * Get an exported SVG of the given shapes.
	//  *
	//  * @param ids - The shapes (or shape ids) to export.
	//  * @param opts - Options for the export.
	//  *
	//  * @returns The SVG element.
	//  *
	//  * @public
	//  */
	// export const getSvg = async (editor: Editor, shapes: TLShapeId[] | TLShape[], opts = {} as Partial<TLSvgOptions>) => {
	// 	const ids =
	// 		typeof shapes[0] === 'string'
	// 			? (shapes as TLShapeId[])
	// 			: (shapes as TLShape[]).map((s) => s.id)

	// 	if (ids.length === 0) return
	// 	if (!window.document) throw Error('No document')

	// 	const {
	// 		scale = 1,
	// 		background = false,
	// 		padding = SVG_PADDING,
	// 		preserveAspectRatio = false,
	// 	} = opts

	// 	// todo: we shouldn't depend on the public theme here
	// 	const theme = getDefaultColorTheme({ isDarkMode: editor.user.getIsDarkMode() })

	// 	// ---Figure out which shapes we need to include
	// 	const shapeIdsToInclude = editor.getShapeAndDescendantIds(ids)
	// 	const renderingShapes = editor.getUnorderedRenderingShapes(false).filter(({ id }) =>
	// 		shapeIdsToInclude.has(id)
	// 	)

	// 	// --- Common bounding box of all shapes
	// 	let bbox = null
	// 	if (opts.bounds) {
	// 		bbox = opts.bounds
	// 	} else {
	// 		for (const { maskedPageBounds } of renderingShapes) {
	// 			if (!maskedPageBounds) continue
	// 			if (bbox) {
	// 				bbox.union(maskedPageBounds)
	// 			} else {
	// 				bbox = maskedPageBounds.clone()
	// 			}
	// 		}
	// 	}

	// 	// no unmasked shapes to export
	// 	if (!bbox) return

	// 	const singleFrameShapeId =
	// 		ids.length === 1 && editor.isShapeOfType<TLFrameShape>(editor.getShape(ids[0])!, 'frame')
	// 			? ids[0]
	// 			: null
	// 	if (!singleFrameShapeId) {
	// 		// Expand by an extra 32 pixels
	// 		bbox.expandBy(padding)
	// 	}

	// 	// We want the svg image to be BIGGER THAN USUAL to account for image quality
	// 	const w = bbox.width * scale
	// 	const h = bbox.height * scale

	// 	// --- Create the SVG

	// 	// Embed our custom fonts
	// 	const svg = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg')

	// 	if (preserveAspectRatio) {
	// 		svg.setAttribute('preserveAspectRatio', preserveAspectRatio)
	// 	}

	// 	svg.setAttribute('direction', 'ltr')
	// 	svg.setAttribute('width', w + '')
	// 	svg.setAttribute('height', h + '')
	// 	svg.setAttribute('viewBox', `${bbox.minX} ${bbox.minY} ${bbox.width} ${bbox.height}`)
	// 	svg.setAttribute('stroke-linecap', 'round')
	// 	svg.setAttribute('stroke-linejoin', 'round')
	// 	// Add current background color, or else background will be transparent

	// 	if (background) {
	// 		if (singleFrameShapeId) {
	// 			svg.style.setProperty('background', theme.solid)
	// 		} else {
	// 			svg.style.setProperty('background-color', theme.background)
	// 		}
	// 	} else {
	// 		svg.style.setProperty('background-color', 'transparent')
	// 	}

	// 	try {
	// 		document.body.focus?.() // weird but necessary
	// 	} catch (e) {
	// 		// not implemented
	// 	}

	// 	// Add the defs to the svg
	// 	const defs = window.document.createElementNS('http://www.w3.org/2000/svg', 'defs')
	// 	// svg.append(defs)

	// 	const exportDefPromisesById = new Map<string, Promise<void>>()
	// 	const exportContext: SvgExportContext = {
	// 		addExportDef: (def: SvgExportDef) => {
  //       return;
	// 			// if (exportDefPromisesById.has(def.key)) return
	// 			// const promise = (async () => {
	// 			// 	const elements = await def.getElement()
	// 			// 	if (!elements) return

	// 			// 	const comment = document.createComment(`def: ${def.key}`)
	// 			// 	defs.appendChild(comment)

	// 			// 	for (const element of Array.isArray(elements) ? elements : [elements]) {
	// 			// 		defs.appendChild(element)
	// 			// 	}
	// 			// })()
	// 			// exportDefPromisesById.set(def.key, promise)
	// 		},
	// 	}

	// 	const unorderedShapeElements = (
	// 		await Promise.all(
	// 			renderingShapes.map(async ({ id, opacity, index, backgroundIndex }) => {
	// 				// Don't render the frame if we're only exporting a single frame
	// 				if (id === singleFrameShapeId) return []

	// 				const shape = editor.getShape(id)!

	// 				if (editor.isShapeOfType<TLGroupShape>(shape, 'group')) return []

	// 				const util = editor.getShapeUtil(shape)

	// 				let shapeSvgElement = await util.toSvg?.(shape, exportContext)
	// 				let backgroundSvgElement = await util.toBackgroundSvg?.(shape, exportContext)

	// 				// wrap the shapes in groups so we can apply properties without overwriting ones from the shape util
	// 				if (shapeSvgElement) {
	// 					const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	// 					outerElement.appendChild(shapeSvgElement)
	// 					shapeSvgElement = outerElement
	// 				}

	// 				if (backgroundSvgElement) {
	// 					const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	// 					outerElement.appendChild(backgroundSvgElement)
	// 					backgroundSvgElement = outerElement
	// 				}

	// 				if (!shapeSvgElement && !backgroundSvgElement) {
	// 					const bounds = editor.getShapePageBounds(shape)!
	// 					const elm = window.document.createElementNS('http://www.w3.org/2000/svg', 'rect')
	// 					elm.setAttribute('width', bounds.width + '')
	// 					elm.setAttribute('height', bounds.height + '')
	// 					elm.setAttribute('fill', theme.solid)
	// 					elm.setAttribute('stroke', theme.grey.pattern)
	// 					elm.setAttribute('stroke-width', '1')
	// 					shapeSvgElement = elm
	// 				}

	// 				let pageTransform = editor.getShapePageTransform(shape)!.toCssString()
	// 				if ('scale' in shape.props) {
	// 					if (shape.props.scale !== 1) {
	// 						pageTransform = `${pageTransform} scale(${shape.props.scale}, ${shape.props.scale})`
	// 					}
	// 				}

	// 				shapeSvgElement?.setAttribute('transform', pageTransform)
	// 				backgroundSvgElement?.setAttribute('transform', pageTransform)
	// 				shapeSvgElement?.setAttribute('opacity', opacity + '')
	// 				backgroundSvgElement?.setAttribute('opacity', opacity + '')

	// 				// Create svg mask if shape has a frame as parent
	// 				const pageMask = editor.getShapeMask(shape.id)
	// 				if (pageMask) {
	// 					// Create a clip path and add it to defs
	// 					const clipPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
	// 					defs.appendChild(clipPathEl)
	// 					const id = uniqueId()
	// 					clipPathEl.id = id

	// 					// Create a polyline mask that does the clipping
	// 					const mask = document.createElementNS('http://www.w3.org/2000/svg', 'path')
	// 					mask.setAttribute('d', `M${pageMask.map(({ x, y }) => `${x},${y}`).join('L')}Z`)
	// 					clipPathEl.appendChild(mask)

	// 					// Create group that uses the clip path and wraps the shape elements
	// 					if (shapeSvgElement) {
	// 						const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	// 						outerElement.setAttribute('clip-path', `url(#${id})`)
	// 						outerElement.appendChild(shapeSvgElement)
	// 						shapeSvgElement = outerElement
	// 					}

	// 					if (backgroundSvgElement) {
	// 						const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	// 						outerElement.setAttribute('clip-path', `url(#${id})`)
	// 						outerElement.appendChild(backgroundSvgElement)
	// 						backgroundSvgElement = outerElement
	// 					}
	// 				}

	// 				const elements = []
	// 				if (shapeSvgElement) {
	// 					elements.push({ zIndex: index, element: shapeSvgElement })
	// 				}
	// 				if (backgroundSvgElement) {
	// 					elements.push({ zIndex: backgroundIndex, element: backgroundSvgElement })
	// 				}

	// 				return elements
	// 			})
	// 		)
	// 	).flat()

	// 	// await Promise.all(exportDefPromisesById.values())

	// 	for (const { element } of unorderedShapeElements.sort((a, b) => a.zIndex - b.zIndex)) {
	// 		svg.appendChild(element)
	// 	}

	// 	return svg
	// }
