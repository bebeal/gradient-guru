'use client';

import React from 'react';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { cn, spectrum } from '@/utils';

const scopedColorKeys = ['primary', 'secondary'];
const globalKeys = ['muted', 'success','error'];

const fixColor = (color: string) => color.replace('<alpha-value>', '1');

const fullConfig = resolveConfig(tailwindConfig);
const theme: any = fullConfig?.theme;
const themeColors: any = theme?.colors;

interface SamplesProps {
  bgColorName: string;
  bgColor: string;
  textColors: string[];
}

const Samples: React.FC<SamplesProps> = ({ bgColorName, bgColor, textColors }: any) => {
  return (
    <div className="flex flex-col w-full h-auto gap-1 p-2 border border-primary rounded" style={{backgroundColor: bgColor}}>
      {Object.keys(textColors).map((textColorKey: any, index: number) => {
        const textColor = textColors[textColorKey];
        return (
          <div key={textColorKey} className={`flex flex-col items-center justify-center w-full h-auto text-base gap-1 p-2`}>
            <div className="w-full h-full font-bold">
              <code style={{color: textColor}}>{textColorKey}</code> on <code>bg-{bgColorName}</code>:
            </div>
            <div className="flex flex-row items-center justify-center w-full min-p-px0" style={{color: textColor}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            {index !== Object.keys(textColors).length - 1 && <hr className="w-full h-px p-[1px] bg-[rgb(var(--border-primary))]" />}
          </div>
        )
      })}
    </div>
  );
};

interface PaletteProps {
  colors: Record<string, string> | string;
  colorName: string;
  swapShade?: boolean;
}

const Palette: React.FC<PaletteProps> = ({ colors, colorName, swapShade = false }) => {
  const Swatch = ({colorValue, colorName }: any) => {
    return colorValue ? (
      <div key={colorName} className="w-auto h-auto flex flex-col justify-center items-center border border-primary rounded">
        <div className={`w-32 h-32 rounded-t-sm`} style={{backgroundColor: fixColor(colorValue)}} />
        <div className="text-center text-xs text-primary w-full h-auto border-primary border-t">{colorName}</div>
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col items-center p-2">
      <div className="text-lg font-semibold mb-2">{colorName}</div>
      <div className="flex flex-col gap-2">
        {colors && typeof colors === 'string'
          ? <Swatch colorValue={colors} key={colorName} colorName={colorName} />
          : colors ? Object.entries(colors).map(([shade, colorValue]) => <Swatch colorValue={colorValue} key={shade} colorName={!swapShade ? `${colorName}-${shade}` : `${shade}-${colorName}`} />)
          : null}
      </div>
    </div>
  );
};

const LinearGradientTest = () => {
  return (
    <div className="w-auto h-auto flex flex-col items-start justify-center p-10 gap-1">
      <div className={cn(`flex items-center gap-2`)}>
        <div className={cn(`[background-image:linear-gradient(to_right,${spectrum.join(',')})] w-[200px] h-[20px]`)} />
        <div className={cn(`text-xs`)}>CSS Linear Gradient</div>
      </div>
      <div className={cn(`flex items-center gap-2`)}>
        <svg width="200" height="20"> <defs> <linearGradient id={`test-svg-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">{spectrum.map((color: string, index: number) => (<stop key={index} offset={`${index * 100 / (spectrum.length - 1)}%`} stopColor={color} />))}</linearGradient></defs><rect width="200" height="20" fill="url(#test-svg-gradient)" /></svg>
        <div className={cn(`text-xs`)}>SVG Linear Gradient with color stops</div>
      </div>
    </div>
  )
};

const PalettesPage: React.FC = () => {
  const contrastColorMapping = scopedColorKeys.map(bgColorName => {
    const bgColor = fixColor(theme['backgroundColor'][bgColorName]);
    const scopedTextColors = scopedColorKeys
      .reduce((acc: any, textColorKey) => {
        acc[`text-${textColorKey}`] = fixColor(theme['textColor'][textColorKey]);
        return acc;
    }, {});
    const globalTextColors: any = globalKeys.reduce((acc: any, textColorKey: any) => {
      const textColors = theme['textColor'][textColorKey];
      if (typeof textColors === 'string') {
        acc[`text-${textColorKey}`] = fixColor(textColors);
      } else if (textColors) {
        Object.entries(textColors)?.forEach(([shade, colorValue]: any) => {
          acc[`text-${textColorKey}-${shade}`] = fixColor(colorValue);
        });
      }
      return acc;
    }, {});
    const textColors = {...scopedTextColors, ...globalTextColors};
    return {
      bgColorName,
      bgColor,
      textColors,
    };
  });

  return (
    <div className="flex flex-col h-auto">
      <hr className="w-full p-px bg-[rgb(var(--border-primary))]" />
      <LinearGradientTest />
      <hr className="w-full p-px bg-[rgb(var(--border-primary))]" />
      <div className="flex flex-row items-start justify-start p-2 flex-wrap">
        {scopedColorKeys.map(key => {
          const scopedColors = {
            bg: fixColor(theme['backgroundColor'][key]),
            text: fixColor(theme['textColor'][key]),
            border: fixColor(theme['borderColor'][key]),
          }
          return <Palette key={key} colors={scopedColors} colorName={key} swapShade={true} />;
        })}
      </div>
      <hr className="w-full p-px bg-[rgb(var(--border-primary))]" />
      <div className="flex flex-row items-start justify-start p-2 flex-wrap">
        {globalKeys.map(key => {
          return <Palette key={key} colors={themeColors[key]} colorName={key} />;
        })}
      </div>
      <hr className="w-full p-px bg-[rgb(var(--border-primary))]" />
      <div className="flex flex-col items-start justify-start p-4 gap-2 m-2 h-full w-auto">
        {contrastColorMapping.map(({ bgColorName, bgColor, textColors }) => {
          return (
            <Samples key={bgColor} bgColorName={bgColorName} bgColor={bgColor} textColors={textColors} />
          )
        })}
      </div>
      <hr className="w-full p-px bg-[rgb(var(--border-primary))]" />
    </div>
  );
};

export default PalettesPage;

// pseudo safelist: bg-primary bg-secondary bg-accent bg-muted bg-error text-primary text-secondary text-accent text-muted text-error border-primary border-secondary border-accent border-muted border-error [background-image:linear-gradient(to_right,#FF1834,#FFC900,#00E0D9,#0074E0,#7F00DE,#FF007E)] w-[200px] h-[20px]
