// refactored this from https://github.com/tldraw/tldraw/blob/main/packages/tldraw/src/lib/utils/export/export.ts
import { ImageConfig } from '@/hooks';
import { Editor, PngHelpers, TLShapeId } from '@tldraw/editor';
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
}

export const scaleDimensions = (width: number, height: number, scale: number): { width: number; height: number } => {
  return {width: Math.floor(width * scale), height: Math.floor(height * scale)}
}

export const adjustSizeForCanvasLimits = (
  scaledWidth: number, 
  scaledHeight: number, 
  width: number, 
  height: number, 
  canvasSizes: any
): { width: number; height: number; scale: number } => {
  let effectiveScale = scaledWidth / width

  if (scaledWidth > canvasSizes.maxWidth || scaledHeight > canvasSizes.maxHeight) {
      if (scaledWidth > canvasSizes.maxWidth) {
          scaledWidth = canvasSizes.maxWidth
          scaledHeight = (scaledWidth / width) * height
      }
      if (scaledHeight > canvasSizes.maxHeight) {
          scaledHeight = canvasSizes.maxHeight
          scaledWidth = (scaledHeight / height) * width
      }

      const areaScale = Math.sqrt(canvasSizes.maxArea / (scaledWidth * scaledHeight))
      scaledWidth *= areaScale
      scaledHeight *= areaScale
      effectiveScale = scaledWidth / width
  }

  return {width: Math.floor(scaledWidth), height: Math.floor(scaledHeight), scale: effectiveScale};
}

// Gets an exported SVG from the editor for the given nodes
export const getSvgElement: any = async (editor: Editor, ids: TLShapeId[], imageConfig?: ImageConfig) => {
	const svg = editor.getSvg(ids, imageConfig);
	if (!svg) throw new Error('Could not construct SVG.');
	return await svg;
};

// Encodes the given svg element as a base64 string
export const encodeSVGElementAsBase64 = (svg: SVGElement): string => {
  const svgStr = new XMLSerializer().serializeToString(svg);
  const base64SVG = window.btoa(decodeURIComponent(encodeURIComponent(svgStr)));
  return `data:image/svg+xml;base64,${base64SVG}`
}

// Encodes the given blob as a base64 string
export const encodeBlobAsBase64 = (blob: Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
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
}

export const encodeSVGAsBase64 = async (svg: SVGElement) => {
  // clone svg so we don't mutate the original
	const svgElement = svg.cloneNode(true) as SVGGraphicsElement
	svgElement.setAttribute('encoding', 'UTF-8"')

  // encode embedded images as base64
	const imgs = Array.from(svgElement.querySelectorAll('image')) as SVGImageElement[]
  await base64EncodeEmbedImages(imgs);

  // encode svg as base64
  return encodeSVGElementAsBase64(svgElement);
}

export const createCanvasFromImage = async (dataUrl: string, width: number, height: number, options: ImageConfig): Promise<HTMLCanvasElement | null> => {
  const { imageSmoothingEnabled=true, imageSmoothingQuality='high' } = options;
  return new Promise((resolve) => {
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
  });
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
}

export const getSvgAsCanvas = async (svg: SVGElement, options: ImageConfig) => {
  const { scale } = options;

  const canvasSizes = await getBrowserCanvasMaxSize();
  const { width, height } = getSvgDimensions(svg);
  const { width: scaledWidth, height: scaledHeight } = scaleDimensions(width, height, scale);
  const { width: effectiveWidth, height: effectiveHeight, scale: effectiveScale } = adjustSizeForCanvasLimits(
    scaledWidth,
    scaledHeight,
    width,
    height,
    canvasSizes
  );

  const base64EncodedSvg = await encodeSVGAsBase64(svg);

  const canvas = await createCanvasFromImage(base64EncodedSvg, effectiveWidth, effectiveHeight, options);
  return { canvas, dimensions: { width: effectiveWidth, height: effectiveHeight, scale: effectiveScale } };
};

export const getSvgAsImage = async (svg: SVGElement, options: ImageConfig) => {
  const { type, quality } = options;
  const { canvas, dimensions } = await getSvgAsCanvas(svg, options);
  if (!canvas) return null;
  const blob = await createBlobFromCanvas(canvas, type, quality);
  if (!blob) return null;

  const view = new DataView(await blob.arrayBuffer());
  return PngHelpers.setPhysChunk(view, dimensions.scale, {
    type: 'image/' + type,
  });
};

export const getExportedImageBlob = async (editor: Editor, ids: TLShapeId[], options: ImageConfig) => {
	return await getSvgAsImage(await getSvgElement(editor, ids, options), options)
}
