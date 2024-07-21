import { forwardRef, Suspense, SVGProps, useCallback } from 'react';
import UnknownSprite from '@/public/icons/201-question.svg';
import { IconCache } from './IconSet';

export const formatAssetUrl = (assetUrl: any, format = {}) => {
  const assetUrlString = typeof assetUrl === 'string' ? assetUrl : assetUrl.src;
  if (typeof format === 'function') return format(assetUrlString);
  const { baseUrl = '' }: any = format;
  if (assetUrlString.startsWith('data:')) return assetUrlString;
  if (assetUrlString.match(/^https?:\/\//)) return assetUrlString;
  return `${baseUrl.replace(/\/$/, '')}/${assetUrlString.replace(/^\.?\//, '')}`;
};

// just make optional for now to make things run, will make stricter later (I'm never actually gonna fucking do this - feel free to yourself)
export interface IconProps extends SVGProps<SVGSVGElement> {
  set?: string;
  icon?: string;
  classNames?: string;
  [key: string]: any;
}
export const defaultProps = { width: '1em', height: '100%', fill: 'currentColor', stroke: 'none' };
export const Icon = forwardRef<SVGSVGElement, IconProps>(({ set = 'Custom', icon = 'UnknownSprite', ...rest }, ref?) => {
  const fetchIcon = useCallback((): JSX.Element => {
    // console.log('iconsets: ', IconSets, '\nset: ', set, '\nicon: ', icon)
    const iconSet = IconCache[set];
    let error = false;
    if (!iconSet) {
      error = true;
      console.error(`Icon set "${set}" not found.`);
    }

    const IconComponent = iconSet[icon];
    if (!IconComponent) {
      error = true;
      console.error(`Icon "${icon}" not found in set "${set}".`);
    }

    if (error) {
      return <UnknownSprite {...rest} ref={ref} />;
    }
    const props: any = { ...rest };
    if (set === 'Tldraw') {
      props.style = {
        color: 'currentColor',
        backgroundColor: 'transparent',
        // WebkitMask: `url(${formatAssetUrl(`_next/static/chunks/_app-pages-browser_assets_icons_Tldraw_${icon}_svg.js`)}) center 100% / 100% no-repeat`,
        // mask: `url(${formatAssetUrl(`_next/static/chunks/_app-pages-browser_assets_icons_Tldraw_${icon}_svg.js`)}) center 100% / 100% no-repeat`,
      };
    }
    return <IconComponent {...props} ref={ref} />;
  }, [icon, ref, rest, set]);

  const FetchedIcon = fetchIcon();
  // make fallback have a sane default size to aid in avoiding layout shift
  return <Suspense fallback={<div className="min-w-[1em] min-h-[1em]" />}>{FetchedIcon}</Suspense>;
});
