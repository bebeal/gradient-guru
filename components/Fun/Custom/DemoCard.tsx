'use client'

import { PinContainer } from "@/components";

export interface DemoProps {
  title?: string;
  pinTitle?: string;
  href?: string;
  description?: string;
  content?: React.ReactNode;
}

export const Demo = (props: DemoProps) => {
  const {
    title,
    pinTitle,
    href,
    description,
    content
  } = props;

  return (
    <PinContainer
        title={pinTitle}
        href={href}
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 min-w-[20rem] h-full">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100 h-auto">
            {title}
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 min-h-[48px] flex">
              {description}
            </span>
          </div>
          {content ? <div className="flex w-auto h-auto rounded-lg justify-center items-center mt-4">{content}</div> : <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />}
        </div>
    </PinContainer>
  )
};
