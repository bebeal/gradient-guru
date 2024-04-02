'use client';

import { forwardRef } from 'react';
import UnknownSprite from '@/assets/icons/201-question.svg';
import CenterCircle from '@/assets/icons/Carbon/CenterCircle.svg';
import DotMark from '@/assets/icons/Carbon/DotMark.svg';
import StatusPartialFail from '@/assets/icons/Carbon/StatusPartialFail.svg';
import GradientGuru from '@/assets/icons/GradientGuru.svg';
import { cn } from '@/utils';
import { ThreeFanGpu } from '../CustomIcons/ThreeFanGpu';
import { IconSetMap } from '../IconSet';
import { Spinner } from '../CustomIcons';

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
};
