'use client'

// refactored editor from https://github.com/tldraw/tldraw/blob/main/packages/tldraw/src/lib/utils/export/export.ts
import { ImageExtractorConfig } from '@/hooks';
import { Editor, PngHelpers, SVG_PADDING, SvgExportContext, SvgExportDef, TLFrameShape, TLGroupShape, TLShape, TLShapeId, TLSvgOptions, uniqueId } from '@tldraw/editor';
import canvasSize from 'canvas-size';
import { isSafari } from './device';

export type CanvasMaxSize = {
	maxWidth: number;
	maxHeight: number;
	maxArea: number;
};

let maxSizePromise: Promise<CanvasMaxSize> | null = null;

export const calculateBrowserCanvasMaxSize = async (): Promise<CanvasMaxSize> => {
	const maxWidth = await canvasSize.maxWidth({ usePromise: true })
	const maxHeight = await canvasSize.maxHeight({ usePromise: true })
	const maxArea = await canvasSize.maxArea({ usePromise: true })
	return {
		maxWidth: maxWidth.width,
		maxHeight: maxHeight.height,
		maxArea: maxArea.width * maxArea.height,
	}
};

export const getBrowserCanvasMaxSize = () => {
	if (!maxSizePromise) {
		maxSizePromise = calculateBrowserCanvasMaxSize()
	}

	return maxSizePromise
};

export const getSvgDimensions = (svg: SVGElement): { width: number; height: number } => {
  return {width: +svg.getAttribute('width')!, height: +svg.getAttribute('height')!}
};

export const scaleDimensions = (width: number, height: number, scale: number): { width: number; height: number } => {
  return {width: width * scale, height: height * scale}
};

export const adjustSizeForCanvasLimits = async (
  scaledWidth: number, 
  scaledHeight: number, 
  width: number, 
  height: number, 
): Promise<{ width: number; height: number; scale: number; }> => {
	const canvasSizes = await getBrowserCanvasMaxSize();
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
	const effectiveScale = scaledWidth / width;
  return { width: scaledWidth, height: scaledHeight, scale: effectiveScale }
};

// Gets an exported SVG from the editor for the given nodes
export const getSvgElement: any = async (editor: Editor, ids: TLShapeId[], imageConfig?: ImageExtractorConfig) => {
	const svg = await editor.getSvg(ids, imageConfig);
	if (!svg) throw new Error('Could not construct SVG.');
	return svg;
};

const btoa = (text: string): string => {
  return Buffer.from(text, 'binary').toString('base64');
};

// Encodes the given svg element as a base64 string
export const encodeSVGElementAsBase64 = (svg: SVGElement): string => {
  const svgStr = new XMLSerializer().serializeToString(svg);
  const base64SVG = btoa(decodeURIComponent(encodeURIComponent(svgStr)));
  return `data:image/svg+xml;base64,${base64SVG}`
};

// Encodes the given blob as a base64 string
export const encodeBlobAsBase64 = (blob: Blob): Promise<string> => {
	return new Promise((resolve, _) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result as string)
		reader.readAsDataURL(blob)
	})
};

// Encodes the given image src as a base64 string
export const encodeImageSrcAsBase64 = async (src: string): Promise<string> => {
  const blob = await (await fetch(src)).blob();
  return encodeBlobAsBase64(blob);
};

// Encodes the given imgs as base64
export const base64EncodeEmbedImages = async (imgs: SVGImageElement[]): Promise<void> => {
  for (const img of imgs) {
      const src = img.getAttribute('xlink:href')
      if (src && !src.startsWith('data:')) {
          const base64 = await encodeImageSrcAsBase64(src)
          img.setAttribute('xlink:href', base64)
      }
  }
};

export const encodeSVGAsBase64 = async (svg: SVGElement, encodeEmbedImages = true): Promise<string> => {
  // clone svg so we don't mutate the original
	const svgElement = svg.cloneNode(true) as SVGGraphicsElement
	svgElement.setAttribute('encoding', 'utf-8"')

  if (encodeEmbedImages) {
    // encode embedded images as base64
    const imgs = Array.from(svgElement.querySelectorAll('image')) as SVGImageElement[]
    await base64EncodeEmbedImages(imgs);
  }

  // encode svg as base64
  return encodeSVGElementAsBase64(svgElement);
};

export const getSVGAsBlob = async (svg: SVGElement, encodeEmbedImages = true): Promise<string | null> => {
  // Clone svg so we don't mutate the original
  const svgElement = svg.cloneNode(true) as SVGGraphicsElement;
  svgElement.setAttribute('encoding', 'utf-8');

  if (encodeEmbedImages) {
    // Encode embedded images as base64
    const imgs = Array.from(svgElement.querySelectorAll('image')) as SVGImageElement[];
    await base64EncodeEmbedImages(imgs);
  }

  // Convert SVG element to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  // Create a Blob from the SVG string
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });

  // Create and return a Blob URL
  return URL.createObjectURL(svgBlob);
};

export const createCanvasFromImage = async (dataUrl: string, width: number, height: number, options: ImageExtractorConfig): Promise<HTMLCanvasElement | null> => {
  const { imageSmoothingEnabled=true, imageSmoothingQuality='high' } = options;
  return await (new Promise((resolve) => {
    const image = new Image();
		image.crossOrigin = 'anonymous';

		image.onload = async () => {
			// safari will fire `onLoad` before the fonts in the SVG are
			// actually loaded. just waiting around a while is brittle, but
			// there doesn't seem to be any better solution for now :( see
			// https://bugs.webkit.org/show_bug.cgi?id=219770
			if (isSafari()) {
				await new Promise((resolve) => setTimeout(resolve, 250));
			}

			const canvas = document.createElement('canvas') as HTMLCanvasElement;
			const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

			canvas.width = width;
			canvas.height = height;

			ctx.imageSmoothingEnabled = imageSmoothingEnabled;
			ctx.imageSmoothingQuality = imageSmoothingQuality;
			ctx.drawImage(image, 0, 0, width, height);

			URL.revokeObjectURL(dataUrl);

			resolve(canvas);
    }
    image.onerror = () => resolve(null);
		image.src = dataUrl;
  }));
};

export const createBlobFromCanvas = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
  return new Promise<Blob | null>((resolve) =>
		canvas.toBlob((blob) => {
      if (!blob) {
        resolve(null)
      }
      resolve(blob)
		},
    'image/' + type,
    quality
	));
};

export const getSvgAsCanvas = async (svg: SVGElement, options: ImageExtractorConfig, encodeEmbedImages = true) => {
  const { scale=1 } = options;

  const { width, height } = getSvgDimensions(svg);
  const { width: scaledWidth, height: scaledHeight } = scaleDimensions(width, height, scale);
  const { width: effectiveWidth, height: effectiveHeight, scale: effectiveScale } = await adjustSizeForCanvasLimits(
    scaledWidth,
    scaledHeight,
    width,
    height
  );

  const base64EncodedSvg = await encodeSVGAsBase64(svg, encodeEmbedImages);
  const canvas = await createCanvasFromImage(base64EncodedSvg, effectiveWidth, effectiveHeight, options);
  return { canvas, dimensions: { width: effectiveWidth, height: effectiveHeight, scale: effectiveScale } };
};

export const getSvgAsImage = async (svg: SVGElement, options: ImageExtractorConfig) => {
  const { type='png', quality=1 } = options;
  const { canvas, dimensions } = await getSvgAsCanvas(svg, options);
  if (!canvas) return null;
  const blob = await createBlobFromCanvas(canvas, type, quality);
  if (!blob) return null;

  const view = new DataView(await blob.arrayBuffer());
  return PngHelpers.setPhysChunk(view, dimensions.scale, {
    type: 'image/' + type,
  });
};

export const getExportedCanvas = async (editor: Editor, ids: TLShapeId[], options: ImageExtractorConfig) => {
  return await getSvgAsCanvas(await getSvgElement(editor, ids, options), options);
};

export const getExportedImageBlob = async (editor: Editor, ids: TLShapeId[], options: ImageExtractorConfig) => {
  const svg = await getSvgElement(editor, ids, options);
	return await getSvgAsImage(svg, options);
};


/**
 * Get an exported SVG of the given shapes.
 *
 * @param ids - The shapes (or shape ids) to export.
 * @param opts - Options for the export.
 *
 * @returns The SVG element.
 *
 * @public
 */
export const getSvgPreview = async (editor: Editor, shapes: TLShapeId[] | TLShape[], opts = {} as Partial<TLSvgOptions>): Promise<SVGSVGElement | undefined> => {
  const ids =
    typeof shapes[0] === 'string'
      ? (shapes as TLShapeId[])
      : (shapes as TLShape[]).map((s) => s.id)

  if (ids.length === 0) return;
  if (!window.document) throw Error('No document')

  const {
    scale = 1,
    background = false,
    padding = SVG_PADDING,
    preserveAspectRatio = false,
  } = opts

  // ---Figure out which shapes we need to include
  const shapeIdsToInclude = editor.getShapeAndDescendantIds(ids)
  const renderingShapes = editor.getUnorderedRenderingShapes(false).filter(({ id }: {id: TLShapeId}) =>
    shapeIdsToInclude.has(id)
  )

  // --- Common bounding box of all shapes
  let bbox = null
  if (opts.bounds) {
    bbox = opts.bounds
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

  // no unmasked shapes to export
  if (!bbox) return

  const singleFrameShapeId =
    ids.length === 1 && editor.isShapeOfType<TLFrameShape>(editor.getShape(ids[0])!, 'frame')
      ? ids[0]
      : null
  if (!singleFrameShapeId) {
    // Expand by an extra 32 pixels
    bbox.expandBy(padding)
  }

  // We want the svg image to be BIGGER THAN USUAL to account for image quality
  const w = bbox.width * scale
  const h = bbox.height * scale

  // --- Create the SVG

  // Embed our custom fonts
  const svg = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  if (preserveAspectRatio) {
    svg.setAttribute('preserveAspectRatio', preserveAspectRatio)
  }

  svg.setAttribute('direction', 'ltr')
  svg.setAttribute('width', w + '')
  svg.setAttribute('height', h + '')
  svg.setAttribute('viewBox', `${bbox.minX} ${bbox.minY} ${bbox.width} ${bbox.height}`)
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  // Add current background color, or else background will be transparent

  if (background) {
    if (singleFrameShapeId) {
      svg.style.setProperty('background', `#28292e`)
    } else {
      svg.style.setProperty('background-color', `#212529`);
    }
  } else {
    svg.style.setProperty('background-color', 'transparent')
  }

  try {
    document.body.focus?.() // weird but necessary
  } catch (e) {
    // not implemented
  }

  // Add the defs to the svg
  const defs = window.document.createElementNS('http://www.w3.org/2000/svg', 'defs')
  svg.append(defs)

  const exportDefPromisesById = new Map<string, Promise<void>>()
  const exportContext: SvgExportContext = {
    addExportDef: (def: SvgExportDef) => {
      if (exportDefPromisesById.has(def.key)) return;
      // Skip font defs if generating SVG for preview
      return;

      const promise = (async () => {
        const elements = await def.getElement();
        if (!elements) return;

        const comment = document.createComment(`def: ${def.key}`);
        defs.appendChild(comment);

        for (const element of Array.isArray(elements) ? elements : [elements]) {
          defs.appendChild(element);
        }
      })();
      exportDefPromisesById.set(def.key, promise);
    },
  };

  const unorderedShapeElements = (
    await Promise.all(
      renderingShapes.map(async ({ id, opacity, index, backgroundIndex }: any) => {
        // Don't render the frame if we're only exporting a single frame
        if (id === singleFrameShapeId) return []

        const shape = editor.getShape(id)!

        if (editor.isShapeOfType<TLGroupShape>(shape, 'group')) return []

        const util = editor.getShapeUtil(shape)

        let shapeSvgElement = await util.toSvg?.(shape, exportContext)
        let backgroundSvgElement = await util.toBackgroundSvg?.(shape, exportContext)

        // wrap the shapes in groups so we can apply properties without overwriting ones from the shape util
        if (shapeSvgElement) {
          const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
          outerElement.appendChild(shapeSvgElement)
          shapeSvgElement = outerElement
        }

        if (backgroundSvgElement) {
          const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
          outerElement.appendChild(backgroundSvgElement)
          backgroundSvgElement = outerElement
        }

        if (!shapeSvgElement && !backgroundSvgElement) {
          const bounds = editor.getShapePageBounds(shape)!
          const elm = window.document.createElementNS('http://www.w3.org/2000/svg', 'rect')
          elm.setAttribute('width', bounds.width + '')
          elm.setAttribute('height', bounds.height + '')
          elm.setAttribute('fill', '#28292e')
          elm.setAttribute('stroke', `#7c8187`);
          elm.setAttribute('stroke-width', '1')
          shapeSvgElement = elm
        }

        let pageTransform = editor.getShapePageTransform(shape)!.toCssString()
        if ('scale' in shape.props) {
          if (shape.props.scale !== 1) {
            pageTransform = `${pageTransform} scale(${shape.props.scale}, ${shape.props.scale})`
          }
        }

        shapeSvgElement?.setAttribute('transform', pageTransform)
        backgroundSvgElement?.setAttribute('transform', pageTransform)
        shapeSvgElement?.setAttribute('opacity', opacity + '')
        backgroundSvgElement?.setAttribute('opacity', opacity + '')

        // Create svg mask if shape has a frame as parent
        const pageMask = editor.getShapeMask(shape.id)
        if (pageMask) {
          // Create a clip path and add it to defs
          const clipPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
          defs.appendChild(clipPathEl)
          const id = uniqueId()
          clipPathEl.id = id

          // Create a polyline mask that does the clipping
          const mask = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          mask.setAttribute('d', `M${pageMask.map(({ x, y }) => `${x},${y}`).join('L')}Z`)
          clipPathEl.appendChild(mask)

          // Create group that uses the clip path and wraps the shape elements
          if (shapeSvgElement) {
            const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            outerElement.setAttribute('clip-path', `url(#${id})`)
            outerElement.appendChild(shapeSvgElement)
            shapeSvgElement = outerElement
          }

          if (backgroundSvgElement) {
            const outerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            outerElement.setAttribute('clip-path', `url(#${id})`)
            outerElement.appendChild(backgroundSvgElement)
            backgroundSvgElement = outerElement
          }
        }

        const elements = []
        if (shapeSvgElement) {
          elements.push({ zIndex: index, element: shapeSvgElement })
        }
        if (backgroundSvgElement) {
          elements.push({ zIndex: backgroundIndex, element: backgroundSvgElement })
        }

        return elements
      })
    )
  ).flat()

  await Promise.all(exportDefPromisesById.values())

  for (const { element } of unorderedShapeElements.sort((a, b) => a.zIndex - b.zIndex)) {
    svg.appendChild(element)
  }

  return svg
}
