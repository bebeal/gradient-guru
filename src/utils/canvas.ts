
import canvasSize from 'canvas-size';

// https://github.com/jhildenbiddle/canvas-size?tab=readme-ov-file#test-results
export const MAX_SAFE_CANVAS_DIMENSION = 8192

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

export const clampToBrowserMaxCanvasSize = async (width: number, height: number) => {
	if (width <= MAX_SAFE_CANVAS_DIMENSION && height <= MAX_SAFE_CANVAS_DIMENSION) {
		return [width, height];
	}

	const { maxWidth, maxHeight, maxArea } = await getBrowserCanvasMaxSize();
	const aspectRatio = width / height;

	if (width > maxWidth) {
		width = maxWidth;
		height = width / aspectRatio;
	}

	if (height > maxHeight) {
		height = maxHeight;
		width = height * aspectRatio;
	}

	if (width * height > maxArea) {
		const ratio = Math.sqrt(maxArea / (width * height));
		width *= ratio;
		height *= ratio;
	}

	return [width, height];
}

export const getSvgDimensions = (svg: SVGElement): { width: number; height: number } => {
  return {width: +svg.getAttribute('width')!, height: +svg.getAttribute('height')!}
};

export const scaleDimensions = (width: number, height: number, scale: number): { width: number; height: number } => {
  return {width: width * scale, height: height * scale}
};
