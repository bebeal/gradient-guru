'use client';

import { forwardRef } from 'react';
import UnknownSprite from '@/public/icons/201-question.svg';
import CenterCircle from '@/public/icons/Carbon/CenterCircle.svg';
import DotMark from '@/public/icons/Carbon/DotMark.svg';
import StatusPartialFail from '@/public/icons/Carbon/StatusPartialFail.svg';
import GradientGuru from '@/public/icons/GradientGuru.svg';
import { cn } from '@/utils';
import { Spinner } from '../CustomIcons';
import { ThreeFanGpu } from '../CustomIcons/ThreeFanGpu';
import { IconSetMap } from '../IconSet';

export const DotDotDot = forwardRef((props: any, ref: any) => {
  const { className = '', vertical = false, bounce = false, width, height, ...rest } = props;
  return (
    <div ref={ref} className={cn('flex gap-[0.5px] w-auto h-auto justify-center items-center', vertical ? 'flex-col' : 'flex-row', `w-[${width}] h-[${height}]`, className)}>
      <DotMark
        width={'1em'}
        fill={'currentColor'}
        stroke={'currentColor'}
        strokeWidth={'1'}
        viewBox="0 0 32 32"
        className={cn('currentColor rounded-full flex w-auto h-auto', bounce && 'animate-dot-bounce anim-duration-1000 anim-delay-300')}
      />
      <DotMark
        width={'1em'}
        fill={'currentColor'}
        stroke={'currentColor'}
        strokeWidth={'1'}
        viewBox="0 0 32 32"
        className={cn('currentColor rounded-full flex w-auto h-auto', bounce && 'animate-dot-bounce anim-duration-1000 anim-delay-500')}
      />
      <DotMark
        width={'1em'}
        fill={'currentColor'}
        stroke={'currentColor'}
        strokeWidth={'1'}
        viewBox="0 0 32 32"
        className={cn('currentColor rounded-full flex w-auto h-auto', bounce && 'animate-dot-bounce anim-duration-1000 anim-delay-700')}
      />
    </div>
  );
});

export const Loader = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return <Spinner ref={ref} className={cn('animate-spin', className)} {...rest} />;
});

export const HorizontalDots = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return <DotDotDot ref={ref} vertical={false} className={cn(className)} {...rest} />;
});

export const VerticalDots = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return <DotDotDot ref={ref} vertical={true} className={cn(className)} {...rest} />;
});

export const DotsLoader = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return <DotDotDot ref={ref} bounce={true} className={className} {...rest} />;
});

export const ExternalLink = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} width={'1em'} height={'1em'} fill={'currentColor'} {...props}>
      <path d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z" />
    </svg>
  );
});

export const Share = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} width={'1em'} height={'1em'} fill={'currentColor'} viewBox="0 0 256 256" {...props}>
      <path d="m240.49 103.52l-80-80A12 12 0 0 0 140 32v36.74c-25.76 3.12-53.66 15.89-76.75 35.47c-29.16 24.74-47.32 56.69-51.14 90A16 16 0 0 0 39.67 207c10.46-11.14 47-45.74 100.33-50.42V192a12 12 0 0 0 20.48 8.48l80-80a12 12 0 0 0 .01-16.96ZM164 163v-19a12 12 0 0 0-12-12c-49 0-86.57 21.56-109.79 40.11c7.13-18.16 19.63-35.22 36.57-49.59C101.3 103.41 128.67 92 152 92a12 12 0 0 0 12-12V61l51 51Z" />
    </svg>
  );
});

export const EmptyClipboard = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} width={'1em'} height={'1em'} fill={'currentColor'} viewBox="0 0 32 32" {...props}>
      <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z" transform="translate(0 0)" />
    </svg>
  );
});

export const EmptyChat = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} width={'1em'} height={'1em'} fill={'currentColor'} viewBox="0 0 32 32" {...props}>
      <path d="M17.74 30L16 29l4-7h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4.84Z" />
    </svg>
  );
});

export const LoadingChat = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return (
    <div ref={ref} className={cn('relative flex h-full w-auto items-center justify-center overflow-hidden', className)}>
      <EmptyChat {...rest} />
      <div className={cn('absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[65%] h-full')}>
        <DotsLoader width={'1em'} className={'w-auto h-full'} />
      </div>
    </div>
  );
});

export const ErrorChat = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return (
    <div ref={ref} className={cn('relative flex h-full w-auto items-center justify-center overflow-hidden', className)}>
      <EmptyChat height="100%" {...rest} />
      <div className={cn('absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2')}>
        <StatusPartialFail strokeWidth={'1'} stroke={'currentColor'} fill={'currentColor'} height={'0.8em'} viewBox="0 0 32 32" className={'w-auto h-full translate-y-[-0.1em] animate-pulse'} />
      </div>
    </div>
  );
});

export const FocusChat = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return (
    <div ref={ref} className={cn('relative flex h-full w-full items-center justify-center overflow-hidden', className)}>
      <EmptyChat height="100%" className="h-full" {...rest} />
      <div className={cn('absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-75%]')}>
        <CenterCircle strokeWidth={'1'} stroke={'currentColor'} fill={'currentColor'} height={'0.7em'} viewBox="0 0 32 32" className={'w-auto h-full animate-focus-chat p-[0.1em]'} />
      </div>
    </div>
  );
});

export const Smiley = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} fill={'currentColor'} viewBox="0 0 32 32" {...props}>
      <path d="M16,19a6.9908,6.9908,0,0,1-5.833-3.1287l1.666-1.1074a5.0007,5.0007,0,0,0,8.334,0l1.666,1.1074A6.9908,6.9908,0,0,1,16,19Z" />
      <path d="M20,8a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,20,8Z" />
      <path d="M12,8a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,12,8Z" />
    </svg>
  );
});

export const ChatBot = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return (
    <svg ref={ref} fill={'currentColor'} viewBox="0 0 32 32" {...props}>
      <path className={'animate-pulse'} d="M16,19a6.9908,6.9908,0,0,1-5.833-3.1287l1.666-1.1074a5.0007,5.0007,0,0,0,8.334,0l1.666,1.1074A6.9908,6.9908,0,0,1,16,19Z" />
      <path className={'animate-pulse'} d="M20,8a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,20,8Z" />
      <path className={'animate-pulse'} d="M12,8a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,12,8Z" />
      <path d="M17.7358,30,16,29l4-7h6a1.9966,1.9966,0,0,0,2-2V6a1.9966,1.9966,0,0,0-2-2H6A1.9966,1.9966,0,0,0,4,6V20a1.9966,1.9966,0,0,0,2,2h9v2H6a3.9993,3.9993,0,0,1-4-4V6A3.9988,3.9988,0,0,1,6,2H26a3.9988,3.9988,0,0,1,4,4V20a3.9993,3.9993,0,0,1-4,4H21.1646Z" />
    </svg>
  );
});

export const CPU = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} fill={'currentColor'} viewBox="0 0 32 32" {...props}>
      <path d="M11,11V21H21V11Zm8,8H13V13h6Z" transform="translate(0)" />
      <path d="M30,13V11H26V8a2,2,0,0,0-2-2H21V2H19V6H13V2H11V6H8A2,2,0,0,0,6,8v3H2v2H6v6H2v2H6v3a2,2,0,0,0,2,2h3v4h2V26h6v4h2V26h3a2,2,0,0,0,2-2V21h4V19H26V13ZM24,24H8V8H24Z" transform="translate(0)" />
    </svg>
  );
});

export const GPU = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} fill={'currentColor'} viewBox="0 0 16 16" {...props}>
      <g fill="currentColor">
        <path d="M4 8a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Zm7.5-1.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z" />
        <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5Zm5.5 4a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5ZM9 8a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0Z" />
        <path d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-1Zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5Z" />
      </g>
    </svg>
  );
});

export const CopySuccess = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} fill={'currentColor'} viewBox="0 0 32 32" {...props}>
      <path stroke="none" fill="currentColor" d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z" /> <path stroke="none" fill="currentColor" d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z" />{' '}
      <path
        stroke="none"
        fill="currentColor"
        d="m14.73 21.134-2.2194-2.1771 1.3125-1.3325 1.2242 1.1919c0.6733 0.65553 1.3893 1.3354 1.5911 1.5108l0.36688 0.31894 6.8473-6.689 1.3359 1.3359-4.0317 3.9806c-2.2174 2.1893-4.0712 3.9934-4.1195 4.0091-0.04831 0.01567-1.0866-0.95119-2.3072-2.1486z"
        fillRule="evenodd"
        strokeOpacity="0"
      />
    </svg>
  );
});

export const File = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} height={'1em'} fill={'currentColor'} viewBox="0 0 384 512" {...props}>
      <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
    </svg>
  );
});

export const ZippedFile = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} height={'1em'} fill={'currentColor'} viewBox="0 0 384 512" {...props}>
      <path d="M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zM128.4 336c-17.9 0-32.4 12.1-32.4 27c0 15 14.6 27 32.5 27s32.4-12.1 32.4-27s-14.6-27-32.5-27zM224 136V0h-63.6v32h-32V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM95.9 32h32v32h-32zm32.3 384c-33.2 0-58-30.4-51.4-62.9L96.4 256v-32h32v-32h-32v-32h32v-32h-32V96h32V64h32v32h-32v32h32v32h-32v32h32v32h-32v32h22.1c5.7 0 10.7 4.1 11.8 9.7l17.3 87.7c6.4 32.4-18.4 62.6-51.4 62.6z" />
    </svg>
  );
});

export const Folder = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} height={'1em'} fill={'currentColor'} viewBox="0 0 512 512" {...props}>
      <path d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z" />
    </svg>
  );
});

export const OpenFolder = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} height={'1em'} fill={'currentColor'} viewBox="0 0 576 512" {...props}>
      <path d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z" />
    </svg>
  );
});

export const Indeterminate = forwardRef((props?: any, ref?: any) => {
  return (
    <svg ref={ref} height={'1em'} viewBox="0 0 32 32" {...props}>
      <rect x="4" y="14" width="24" height="4" rx="2" ry="2" />
    </svg>
  );
});

export const ClassicPokeBall = forwardRef((props?: any, ref?: any) => {
  return (
    <svg height={'1em'} {...props} ref={ref} viewBox="0 0 1367.000000 1364.000000" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,1364.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path
          d="M6450 13629 c-658 -41 -1278 -164 -1870 -372 -1289 -452 -2413 -1280
-3227 -2377 -775 -1044 -1239 -2297 -1323 -3575 -30 -468 -33 -544 -21 -761
93 -1693 720 -3178 1856 -4394 90 -96 176 -186 192 -199 15 -14 84 -78 153
-142 393 -369 899 -729 1420 -1009 348 -188 798 -375 1185 -494 841 -258 1689
-350 2570 -280 1864 148 3569 1046 4756 2504 564 691 1003 1529 1250 2384 44
153 156 605 188 761 78 383 98 685 82 1235 -15 529 -49 844 -136 1275 -306
1513 -1130 2887 -2325 3881 -1237 1028 -2794 1584 -4405 1573 -115 -1 -271 -6
-345 -10z m-2260 -1288 c98 -22 213 -62 285 -99 274 -138 468 -400 521 -704
22 -125 14 -384 -15 -513 -83 -362 -278 -707 -565 -1004 -375 -386 -830 -642
-1316 -742 -101 -21 -143 -24 -340 -24 -183 0 -241 3 -310 19 -293 64 -517
209 -665 431 -81 122 -130 249 -155 409 -18 106 -7 353 19 471 62 271 192 542
385 800 74 99 342 369 456 459 351 277 766 460 1170 516 111 15 432 4 530 -19z
m4405 -3231 c549 -52 1019 -392 1237 -894 137 -314 159 -679 62 -1013 -72
-251 -206 -468 -408 -661 -522 -498 -1328 -548 -1912 -116 -312 230 -519 568
-585 955 -18 105 -20 149 -16 289 8 239 48 402 147 605 147 301 376 533 675
682 166 84 341 134 528 152 121 12 151 12 272 1z m-2288 -2578 c333 -678 963
-1142 1728 -1274 175 -30 539 -33 714 -5 164 26 358 77 494 131 449 175 823
471 1102 871 27 39 49 71 50 73 9 14 695 -150 1065 -254 342 -97 852 -261
1185 -382 293 -106 661 -245 668 -252 26 -24 -136 -596 -263 -930 -138 -363
-321 -745 -486 -1012 -16 -26 -49 -80 -73 -120 -394 -647 -950 -1269 -1570
-1754 -971 -759 -2152 -1238 -3371 -1365 -431 -45 -1030 -44 -1445 1 -845 93
-1712 363 -2440 763 -210 114 -334 189 -528 319 -1235 823 -2170 2052 -2626
3451 -87 267 -175 605 -162 619 7 8 270 110 487 189 389 141 971 328 1344 434
91 25 219 62 285 80 66 19 248 66 405 104 837 205 1732 347 2605 415 206 16
611 40 720 43 l40 1 72 -146z"
        />
        <path
          d="M8286 8760 c-240 -38 -495 -174 -662 -352 -364 -392 -412 -980 -114
-1424 63 -94 211 -244 296 -302 201 -135 420 -202 659 -202 575 0 1059 425
1136 997 15 114 6 303 -21 411 -51 208 -160 400 -311 549 -159 156 -328 251
-540 304 -96 24 -343 34 -443 19z m324 -91 c372 -46 708 -319 847 -687 53
-142 74 -332 54 -487 -59 -454 -394 -813 -844 -906 -130 -27 -338 -22 -459 9
-375 100 -672 391 -767 755 -99 380 13 771 300 1041 232 220 539 317 869 275z"
        />
      </g>
    </svg>
  );
});

export const CustomIconSet: IconSetMap = {
  HorizontalDots,
  VerticalDots,
  DotsLoader,
  Spinner,
  Loader,
  ExternalLink,
  Share,
  EmptyClipboard,
  EmptyChat,
  LoadingChat,
  ErrorChat,
  FocusChat,
  Smiley,
  ChatBot,
  CPU,
  GPU,
  CopySuccess,
  File,
  ZippedFile,
  Folder,
  OpenFolder,
  Indeterminate,
  ThreeFanGpu,
  GradientGuru,
  UnknownSprite,
  ClassicPokeBall,
};
