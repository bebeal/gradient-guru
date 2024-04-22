import { cn } from '@/utils/utils';

export interface SpinnerProps extends React.ComponentProps<'svg'> {
  active?: boolean;
  r?: number;
  color?: string;
  backgroundColor?: string;
  percentage?: number;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  id?: string;
}
export const Spinner = ({ active = true, r = 40, strokeWidth = 10, color = 'accent', backgroundColor = 'muted', percentage = 33, strokeLinecap = 'round', className, id = `spinner-${color}`, ...props }: SpinnerProps) => {
  const circumference = 2 * Math.PI * r;

  return (
    <svg id={id} aria-live={active ? 'assertive' : 'off'} viewBox="0 0 100 100" fill="transparent" stroke="transparent" className={cn('transition-all text-transparent', className)} {...props}>
      <defs>
        <linearGradient id={`gradientStroke-${id}`} gradientUnits="userSpaceOnUse" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className={cn(`text-${color}-500`)} stopColor={'currentColor'} stopOpacity="100%" />
          <stop offset="100%" className={cn(`text-${color}-400`)} stopColor={'currentColor'} stopOpacity="70%" />
        </linearGradient>
        <linearGradient id={`backgroundStroke-${id}`} gradientUnits="userSpaceOnUse" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className={cn(`text-${backgroundColor}`)} stopColor={'currentColor'} stopOpacity="100%" />
          <stop offset="100%" className={cn(`text-${backgroundColor}`)} stopColor={'currentColor'} stopOpacity="100%" />
        </linearGradient>
      </defs>
      {backgroundColor && backgroundColor !== 'transparent' && backgroundColor.length > 0 && (
        <path d={`M 50,10 A ${r},${r} 0 1 1 49.99,10`} stroke={`url(#backgroundStroke-${id})`} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeDasharray={`${circumference}`} />
      )}
      <path
        d={`M 50,10 A ${r},${r} 0 1 1 49.99,10`}
        stroke={`url(#gradientStroke-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={`${circumference - (percentage / 100) * circumference}`}
      />
    </svg>
  );
};
