import { toBase64 } from "./export";

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const getShimmerPlaceholder = (w: number=700, h: number=475) => `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`

/**
 * A shared function, used on both client and server, to generate a SVG blur placeholder.
 */
export const getImageBlurSvg = ({
  widthInt,
  heightInt,
  blurWidth,
  blurHeight,
  blurDataURL=getShimmerPlaceholder(widthInt, heightInt),
  objectFit='none',
}: {
  widthInt?: number
  heightInt?: number
  blurWidth?: number
  blurHeight?: number
  blurDataURL?: string
  objectFit?: string
}): string => {
  const std = 20
  const svgWidth = blurWidth ? blurWidth * 40 : widthInt
  const svgHeight = blurHeight ? blurHeight * 40 : heightInt

  const viewBox =
    svgWidth && svgHeight ? `viewBox='0 0 ${svgWidth} ${svgHeight}'` : ''
  const preserveAspectRatio = viewBox
    ? 'none'
    : objectFit === 'contain'
    ? 'xMidYMid'
    : objectFit === 'cover'
    ? 'xMidYMid slice'
    : 'none'

  return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${viewBox}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${preserveAspectRatio}' style='filter: url(%23b);' href='${blurDataURL}'/%3E%3C/svg%3E`
}

export const ImageCaption = (props: any) => {
  const { image, caption, ...rest } = props
  return (
    <figure className="relative w-full h-full flex flex-col gap-1" {...rest}>
      {image}
      <figcaption className="text-xs text-center text-muted">{caption}</figcaption>
    </figure>
  )
}
