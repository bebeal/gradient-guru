import React, { FC, Suspense } from 'react';
import MDXOptions from '@/utils/mdx-options.mjs';
// import { MDXRemote } from 'next-mdx-remote/rsc';

import { isEmptyObject } from '@/utils/objects';
import { FrontMatter } from './FrontMatter';
import { CustomMDXComponents } from './MDXComponents';
// katex css
import 'katex/dist/katex.min.css';
import { isDevEnv } from '@/utils/environment';

// dummy for now until find a replacement for next-mdx-remote within mdx-js/mdx
const MDXRemote = (_props: any) => <></>;

export interface MDXLayoutProps {
  children?: any;
  slug?: any;
  frontMatter?: Record<string, any>;
  showFrontMatter?: boolean;
  components?: Record<string, FC>;
  useRemote?: boolean;
}

export const MDXLayout: React.FC<MDXLayoutProps> = (props: MDXLayoutProps) => {
  const { children, slug, frontMatter, showFrontMatter = true, useRemote = true, ...rest } = props;
  const mdxContent = useRemote ? (
    <MDXRemote
      {...rest}
      source={children}
      options={{
        mdxOptions: {
          ...(MDXOptions as any),
          development: isDevEnv,
        },
        scope: frontMatter,
      }}
      components={{
        ...CustomMDXComponents,
        ...(props.components || {}),
      }}
    />
  ) : (
    children
  );

  return (
    <section>
      <article className="w-full mx-auto prose prose-sm prose-zinc dark:prose-invert">
        <Suspense fallback={<>Loading...</>}>
          {showFrontMatter && frontMatter && !isEmptyObject(frontMatter) && <FrontMatter frontMatter={frontMatter} />}
          {slug && <h1 className="text-3xl font-bold text-center w-full">{slug}</h1>}
          {mdxContent}
        </Suspense>
      </article>
    </section>
  );
};
