import { isValidElement, ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import svgToDataUri from 'mini-svg-data-uri';

import { cn } from './utils';

// Encode SVG given as a React functional component as a data URL encoded string
export const getURISVG = (svg: any): string => {
  const markup = renderToStaticMarkup(svg);
  return svgToDataUri(markup);
};

// Encode SVG given as a React functional component as a data URL encoded string, and add CSS url markup to it
export const getEncodedSVGUrl = (svg: any): string => {
  return `url("${typeof svg === 'string' ? svgToDataUri(svg) : getURISVG(svg)}")`;
};

// Check if a react element is an svg in various ways
export const isSVG = (svg: ReactElement): boolean => {
  if (!svg || !svg?.props) return false;
  return (
    (isValidElement(svg) && (svg.type === 'svg' || (typeof svg.type === 'function' && svg.type.name.includes('Svg')))) ||
    (svg.type as any)?.displayName?.includes('Icon') ||
    'viewBox' in svg.props ||
    'd' in svg.props ||
    'fill' in svg.props ||
    'stroke' in svg.props
  );
};

// svg version of linear-gradient using id #svg-gradient-<colors> (e.g. #svg-gradient-38C9EA,db258f,FFA93A,6D3DFC)
export const GradientSvg = (props: any) => {
  const { colors, backglow = true, direction = 'to left', ...rest } = props;
  // translate directions specified in css linear-gradient to svg linearGradient positions
  const directionMap: any = {
    'to left': { x1: '0%', y1: '0%', x2: `${colors.length * 100}%`, y2: '0%' },
    'to right': { x1: `${colors.length * 100}%`, y1: '0%', x2: '0%', y2: '0%' },
    'to top': { x1: '0%', y1: '0%', x2: '0%', y2: `${colors.length * 100}%` },
    'to bottom': { x1: '0%', y1: `${colors.length * 100}%`, x2: '0%', y2: '0%' },
  };

  return (
    <svg width="0" height="0" className={cn(`absolute`)} {...rest}>
      <defs>
        <linearGradient id={`svg-gradient-${colors.join(',').replace(/#/g, '')}`} {...directionMap[direction]}>
          {colors.map((color: string, index: number) => (
            <stop key={index} offset={`${(index * 100) / (colors.length - 1)}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
    </svg>
  );
};

// make an SVG with a 4-corner gradient background (parameterized solution from https://stackoverflow.com/a/53681663)
export const fourCornerGradientBackground = (topLeft: string = '#38C9EA', topRight: string = '#db258f', bottomRight: string = '#FFA93A', bottomLeft: string = '#6D3DFC'): any => {
  return (
    <svg preserveAspectRatio="none" viewBox="0 0 1 1" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop offset="0" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="1"></stop>
        </linearGradient>
        <mask id="m">
          <rect x="0" y="0" width="1" height="1" fill="url(#g)"></rect>
        </mask>
        <linearGradient id="a" gradientTransform="rotate(90)">
          <stop offset="0" stopColor={topRight}></stop>
          <stop offset="1" stopColor={bottomRight}></stop>
        </linearGradient>
        <linearGradient id="b" gradientTransform="rotate(90)">
          <stop offset="0" stopColor={bottomLeft}></stop>
          <stop offset="1" stopColor={topLeft}></stop>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1" height="1" fill="url(#a)" mask="url(#m)"></rect>
      <rect x="0" y="0" width="1" height="1" fill="url(#b)" mask="url(#m)" transform="translate(1,1) rotate(180)"></rect>
    </svg>
  );
};

export const addGridToSvg = (
  svg: SVGSVGElement,
  opts = {} as {
    color?: string;
    size?: number;
    labels?: boolean;
  },
) => {
  const { color = '#00F', size = 100, labels = true } = opts;

  const [x, y, w, h] = svg
    .getAttribute('viewBox')!
    .split(' ')
    .map((v) => +v);

  const grid = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  grid.setAttribute('transform', `translate(${x}, ${y})`);
  grid.setAttribute('id', 'grid');
  grid.setAttribute('stroke', color);
  grid.setAttribute('stroke-width', '1');

  if (labels) {
    grid.setAttribute('font', '10px/10px normal Serif');
    grid.setAttribute('fill', color);
    grid.setAttribute('text-anchor', 'middle');
  }

  // Add vertical lines
  for (let i = 0; i < Math.ceil(w / size); i++) {
    if (i > 0) {
      const verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      verticalLine.setAttribute('x1', `${i * size}`);
      verticalLine.setAttribute('y1', '0');
      verticalLine.setAttribute('x2', `${i * size}`);
      verticalLine.setAttribute('y2', `${h}`);
      grid.appendChild(verticalLine);
    }

    if (labels) {
      const colLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      colLabel.setAttribute('x', `${i * 100 + 50}`);
      colLabel.setAttribute('y', '16');
      colLabel.textContent = String.fromCharCode(97 + i).toUpperCase();
      grid.appendChild(colLabel);
    }
  }

  // Add horizontal lines
  for (let i = 0; i < Math.ceil(h / size); i++) {
    const horizontalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    horizontalLine.setAttribute('x1', '0');
    horizontalLine.setAttribute('y1', `${i * size}`);
    horizontalLine.setAttribute('x2', `${w}`);
    horizontalLine.setAttribute('y2', `${i * size}`);
    grid.appendChild(horizontalLine);

    if (labels) {
      const rowLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      rowLabel.setAttribute('x', '12');
      rowLabel.setAttribute('y', `${i * 100 + 50}`);
      rowLabel.textContent = `${i}`;

      grid.appendChild(rowLabel);
    }
  }

  svg.appendChild(grid);
};
