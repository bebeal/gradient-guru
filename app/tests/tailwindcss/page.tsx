'use client'

import { cn, spectrum } from "@/utils";
import React, { FC } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
import colorPalette from 'tailwindcss/colors'
import { kebabToTitleCase } from '@/utils';
import dlv from 'dlv';
import { ColorPalette } from '@/components';

const fixColor = (color: string) => color.replace('<alpha-value>', '1');

const tailwindColors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const extendedColors = ['muted', 'success', 'error'];
const extendedProperties: string[] = ['primary', 'secondary', 'tertiary'];

const fullConfig = resolveConfig(tailwindConfig);
const theme: any = fullConfig?.theme;

interface SamplesProps {
  bgColorName: string;
  bgColor: string;
  textColors: string[];
}

const Samples: React.FC<SamplesProps> = ({ bgColorName, bgColor, textColors }: any) => {
  return (
    <div className="flex flex-col w-full h-auto gap-1 p-2 border border-black dark:border-white rounded" style={{ backgroundColor: bgColor }}>
      {Object.keys(textColors).map((textColorKey: any, index: number) => {
        const textColor = textColors[textColorKey];
        return (
          <div key={textColorKey} className={`flex flex-col items-center justify-center w-full h-auto text-base gap-1 p-2`}>
            <div className="w-full h-full">
              <code className="font-bold" style={{ color: textColor }}>{textColorKey}</code> on <code className="font-bold">bg-{bgColorName}</code>:
            </div>
            <div className="flex flex-row items-center justify-center w-full min-p-px0" style={{ color: textColor }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            {index !== Object.keys(textColors).length - 1 && <hr className="w-full h-px p-[1px] bg-[rgb(var(--border-primary))]" />}
          </div>
        );
      })}
    </div>
  );
};

const TailwindColors = () => {
  return <ColorPaletteReference colors={tailwindColors} />;
}

const LinearGradients = () => {
  return (
    <div className="w-auto h-auto flex flex-col items-start justify-center p-10 gap-1">
      <div className={cn(`flex items-center gap-2`)}>
        <div className={cn(`border border-black dark:border-white [background-image:linear-gradient(to_right,${spectrum.join(',')})] w-[200px] h-[20px]`)} />
        <div className={cn(`text-xs`)}>CSS Linear Gradient</div>
      </div>
      <div className={cn(`flex items-center gap-2`)}>
        <svg width="200" height="20" className="border border-black dark:border-white"> <defs> <linearGradient id={`test-svg-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">{spectrum.map((color: string, index: number) => (<stop key={color} offset={`${index * 100 / (spectrum.length - 1)}%`} stopColor={color} />))}</linearGradient></defs><rect width="200" height="20" fill="url(#test-svg-gradient)" /></svg>
        <div className={cn(`text-xs`)}>SVG Linear Gradient with color stops</div>
      </div>
    </div>
  );
};

const ExtendedTailwind = () => {
  return (
    <div className="flex flex-col gap-4">
      {extendedProperties.map((key) => {
        const scopedColors = {
          bg: fixColor(fullConfig.theme.backgroundColor[key] as string),
          text: fixColor(fullConfig.theme.textColor[key] as string),
          border: fixColor(fullConfig.theme.borderColor[key] as string),
        };

        return (
          <div key={key} className="flex flex-row items-start justify-start p-2 flex-wrap">
            <ColorPalette name={`bg-${key}`} value={scopedColors.bg} />
            <ColorPalette name={`text-${key}`} value={scopedColors.text} />
            <ColorPalette name={`border-${key}`} value={scopedColors.border} />
          </div>
        );
      })}
      <div className="flex flex-row items-start justify-start p-2 flex-wrap">
        {extendedColors.map((key) => {
          return <ColorPalette key={key} name={key} value={fixColor(theme['backgroundColor'][key])} />
        })}
      </div>
    </div>
  );
};

const TextOnBackground = () => {
  const contrastColorMapping = extendedProperties.map((bgColorName) => {
    const bgColor = fixColor(theme['backgroundColor'][bgColorName]);
    const scopedTextColors = extendedProperties.reduce((acc: any, textColorKey) => {
      acc[`text-${textColorKey}`] = fixColor(theme['textColor'][textColorKey]);
      return acc;
    }, {});
    const globalTextColors: any = extendedColors.reduce((acc: any, textColorKey: any) => {
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
    const textColors = { ...scopedTextColors, ...globalTextColors };
    return {
      bgColorName,
      bgColor,
      textColors,
    };
  });

  return (
    <div className="flex flex-col items-start justify-start p-4 gap-2 m-2 h-full w-auto">
      {contrastColorMapping.map(({ bgColorName, bgColor, textColors }) => {
        return <Samples key={bgColor} bgColorName={bgColorName} bgColor={bgColor} textColors={textColors} />;
      })}
    </div>
  );
};

const ColorPaletteReference = ({ colors=[] }: {colors?: string[]}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1">
      {colors.map((color) => {
        const title = Array.isArray(color) ? color[0] : kebabToTitleCase(color)
        const value = Array.isArray(color) ? color[1] : color

        const palette =
          typeof value === 'string'
            ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((variant) => ({
                name: variant,
                value: dlv(colorPalette, [value, variant]),
              }))
            : Object.keys(value).map((name) => ({ name, value: value[name] }))

        return (
          <div key={title} className="2xl:contents">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5">
              {title
                .split('')
                .flatMap((l: any, i: number) => {
                  return i !== 0 && l.toUpperCase() === l ? [' ', l] : [l]
                })
                .join('')}
            </div>
            <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-3 gap-x-2 sm:mt-2 2xl:mt-0">
              {palette.map((props: any) => (
                <ColorPalette key={JSON.stringify(props)} {...props} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Tests: Record<string, FC> = {
  TailwindColors,
  LinearGradients,
  ExtendedTailwind,
  TextOnBackground,
};

const TailwindCSSPage = () => {
  const title = 'Tailwind CSS';
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {Object.keys(Tests).map((key: any) => {
          const Component: any = Tests[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1 text-sm">
                <h1 className="text-md font-bold text-center">{key.replace('Demo', '')}</h1>
                <Component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TailwindCSSPage;

// pseudo safelist: bg-primary bg-secondary bg-accent bg-muted bg-error text-primary text-secondary text-accent text-muted text-error border-primary border-secondary border-accent border-muted border-error [background-image:linear-gradient(to_right,#FF1834,#FFC900,#00E0D9,#0074E0,#7F00DE,#FF007E)] w-[200px] h-[20px]
// bg-slate-100 bg-slate-200 bg-slate-300 bg-slate-400 bg-slate-500 bg-slate-600 bg-slate-700 bg-slate-800 bg-slate-900
// bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900
// bg-zinc-100 bg-zinc-200 bg-zinc-300 bg-zinc-400 bg-zinc-500 bg-zinc-600 bg-zinc-700 bg-zinc-800 bg-zinc-900
// bg-neutral-100 bg-neutral-200 bg-neutral-300 bg-neutral-400 bg-neutral-500 bg-neutral-600 bg-neutral-700 bg-neutral-800 bg-neutral-900
// bg-stone-100 bg-stone-200 bg-stone-300 bg-stone-400 bg-stone-500 bg-stone-600 bg-stone-700 bg-stone-800 bg-stone-900
// bg-red-100 bg-red-200 bg-red-300 bg-red-400 bg-red-500 bg-red-600 bg-red-700 bg-red-800 bg-red-900 
// bg-orange-100 bg-orange-200 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-700 bg-orange-800 bg-orange-900
// bg-amber-100 bg-amber-200 bg-amber-300 bg-amber-400 bg-amber-500 bg-amber-600 bg-amber-700 bg-amber-800 bg-amber-900
// bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900
// bg-lime-100 bg-lime-200 bg-lime-300 bg-lime-400 bg-lime-500 bg-lime-600 bg-lime-700 bg-lime-800 bg-lime-900
// bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900
// bg-emerald-100 bg-emerald-200 bg-emerald-300 bg-emerald-400 bg-emerald-500 bg-emerald-600 bg-emerald-700 bg-emerald-800 bg-emerald-900
// bg-teal-100 bg-teal-200 bg-teal-300 bg-teal-400 bg-teal-500 bg-teal-600 bg-teal-700 bg-teal-800 bg-teal-900
// bg-cyan-100 bg-cyan-200 bg-cyan-300 bg-cyan-400 bg-cyan-500 bg-cyan-600 bg-cyan-700 bg-cyan-800 bg-cyan-900
// bg-sky-100 bg-sky-200 bg-sky-300 bg-sky-400 bg-sky-500 bg-sky-600 bg-sky-700 bg-sky-800 bg-sky-900
// bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900
// bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900
// bg-violet-100 bg-violet-200 bg-violet-300 bg-violet-400 bg-violet-500 bg-violet-600 bg-violet-700 bg-violet-800 bg-violet-900
// bg-purple-100 bg-purple-200 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-purple-700 bg-purple-800 bg-purple-900
// bg-fuchsia-100 bg-fuchsia-200 bg-fuchsia-300 bg-fuchsia-400 bg-fuchsia-500 bg-fuchsia-600 bg-fuchsia-700 bg-fuchsia-800 bg-fuchsia-900
// bg-pink-100 bg-pink-200 bg-pink-300 bg-pink-400 bg-pink-500 bg-pink-600 bg-pink-700 bg-pink-800 bg-pink-900
// bg-rose-100 bg-rose-200 bg-rose-300 bg-rose-400 bg-rose-500 bg-rose-600 bg-rose-700 bg-rose-800 bg-rose-900