import { forwardRef } from "react";
import { IconSetMap } from "..";

export const CPU = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} fill={"currentColor"} viewBox="0 0 32 32" {...props}>
        <path d="M11,11V21H21V11Zm8,8H13V13h6Z" transform="translate(0)" />
        <path
          d="M30,13V11H26V8a2,2,0,0,0-2-2H21V2H19V6H13V2H11V6H8A2,2,0,0,0,6,8v3H2v2H6v6H2v2H6v3a2,2,0,0,0,2,2h3v4h2V26h6v4h2V26h3a2,2,0,0,0,2-2V21h4V19H26V13ZM24,24H8V8H24Z"
          transform="translate(0)" />
    </svg>
  );
});

export const GPU = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} fill={"currentColor"} viewBox="0 0 16 16" {...props}>
      <g fill="currentColor"><path d="M4 8a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Zm7.5-1.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"/><path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5Zm5.5 4a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5ZM9 8a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0Z"/><path d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-1Zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5Z"/></g>
    </svg>
  )
});

export const CustomIconSet: IconSetMap = {
  CPU,
  GPU,
};
