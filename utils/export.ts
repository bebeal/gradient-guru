import canvasSize from "canvas-size"
import { PngHelpers } from "./png";
import { Editor, TLShapeId } from "@tldraw/editor";
import { ImageConfig } from "@/hooks";

export type TLCopyType = 'svg' | 'png' | 'jpeg' | 'json'
export type TLExportType = 'svg' | 'png' | 'jpeg' | 'webp' | 'json'
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

	return maxSizePromise
}

export const getSvgAsString = (svg: SVGElement) => {
	const clone = svg.cloneNode(true) as SVGGraphicsElement

	svg.setAttribute('width', +svg.getAttribute('width')! + '')
	svg.setAttribute('height', +svg.getAttribute('height')! + '')

	const out = new XMLSerializer()
		.serializeToString(clone)
		.replaceAll('&#10;      ', '')
		.replaceAll(/((\s|")[0-9]*\.[0-9]{2})([0-9]*)(\b|"|\))/g, '$1')

	return out
}

export const getSvgAsImage = async (svg: SVGElement, isSafari: boolean, options: ImageConfig) => {
	const { type, quality, scale } = options

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
			const ctx = canvas.getContext('2d')!

			canvas.width = scaledWidth
			canvas.height = scaledHeight

			ctx.imageSmoothingEnabled = options.imageSmoothingEnabled;
			ctx.imageSmoothingQuality = options.imageSmoothingQuality;
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

export const getSvgAsDataUrl = async (svg: SVGElement) => {
	const clone = svg.cloneNode(true) as SVGGraphicsElement
	clone.setAttribute('encoding', 'UTF-8"')

	const fileReader = new FileReader()
	const imgs = Array.from(clone.querySelectorAll('image')) as SVGImageElement[]

	for (const img of imgs) {
		const src = img.getAttribute('xlink:href')
		if (src) {
			if (!src.startsWith('data:')) {
				const blob = await (await fetch(src)).blob()
				const base64 = await new Promise<string>((resolve, reject) => {
					fileReader.onload = () => resolve(fileReader.result as string)
					fileReader.onerror = () => reject(fileReader.error)
					fileReader.readAsDataURL(blob)
				})
				img.setAttribute('xlink:href', base64)
			}
		}
	}

	return getSvgAsDataUrlSync(clone)
}

export const getSvgAsDataUrlSync = (node: SVGElement) => {
	const svgStr = new XMLSerializer().serializeToString(node)
	// NOTE: `unescape` works everywhere although deprecated
	const base64SVG = window.btoa(unescape(encodeURIComponent(svgStr)))
	return `data:image/svg+xml;base64,${base64SVG}`
}

export const downloadDataURLAsFile = (dataUrl: string, filename: string) => {
	const link = document.createElement('a')
	link.href = dataUrl
	link.download = filename
	link.click()
}

export const getTextBoundingBox = (text: SVGTextElement) => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svg.appendChild(text)

	document.body.appendChild(svg)
	const bbox = text.getBoundingClientRect()
	document.body.removeChild(svg)

	return bbox
}

export const getExportSvgElement = async (editor: Editor, ids: TLShapeId[]) => {
	const svg = await editor.getSvg(ids, {
		scale: 1,
		background: editor.getInstanceState().exportBackground,
	})

	if (!svg) throw new Error('Could not construct SVG.')

	return svg
}

export const getExportedSvgBlob = async (editor: Editor, ids: TLShapeId[]) => {
	return new Blob([getSvgAsString(await getExportSvgElement(editor, ids))], {
		type: 'text/plain',
	})
}

export const getExportedImageBlob = async (editor: Editor, ids: TLShapeId[], options: ImageConfig) => {
	return await getSvgAsImage(await getExportSvgElement(editor, ids), editor.environment.isSafari, options)
}

export const getCanvasImageUrl = async (editor: Editor, ids: TLShapeId[], options: ImageConfig) => {
  return URL.createObjectURL((await getExportedImageBlob(editor, ids, options))!);
}

export const fallbackWriteTextAsync = async (getText: () => Promise<string>) => {
	if (!(navigator && navigator.clipboard)) return
	navigator.clipboard.writeText(await getText())
}
