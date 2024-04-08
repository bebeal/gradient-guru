'use client';

import React, { FC, Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXOptions from '@/utils/mdx-options.mjs';
import { isDevEnv, isEmptyObject } from '@/utils';
import { FrontMatter } from './FrontMatter';
import { CustomMDXComponents } from './MDXComponents';

// katex css
import 'katex/dist/katex.min.css';

export interface MDXLayoutProps {
  content?: any;
  children?: any;
  slug?: any;
  frontMatter?: Record<string, any>;
  showFrontMatter?: boolean;
  components?: Record<string, FC>;
  useRemote?: boolean;
}

export const MDXLayout: React.FC<MDXLayoutProps> = (props: MDXLayoutProps) => {
  const { content, children, slug, frontMatter, showFrontMatter = true, useRemote=true, ...rest } = props;

  const mdxContent = useRemote ? (
    <MDXRemote
      {...rest}
      source={content || children}
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
  ) : content || children;

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
