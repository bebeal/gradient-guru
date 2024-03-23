import React, { FC, Suspense } from 'react';
import { CustomMDXComponents, isDevEnv, isEmptyObject } from '@/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FrontMatter } from './FrontMatter';
import MDXOptions from '@/mdx-options.mjs';

// katex css
import 'katex/dist/katex.min.css';

export interface MDXLayoutProps {
  content?: any;
  slug?: any;
  frontMatter?: Record<string, any>;
  showFrontMatter?: boolean;
  components?: Record<string, FC>;
}

export const MDXLayout: React.FC<MDXLayoutProps> = (props: MDXLayoutProps) => {
  const {
    content,
    slug,
    frontMatter,
    showFrontMatter = true,
    ...rest
  } = props;

  return (
    <section>
      <article className="w-full mx-auto prose prose-sm prose-zinc dark:prose-invert">
        <Suspense fallback={<>Loading...</>}>
          {showFrontMatter && frontMatter && !isEmptyObject(frontMatter) && <FrontMatter frontMatter={frontMatter} />}
          {slug && <h1 className="text-3xl font-bold text-center w-full">{slug}</h1>}
          <MDXRemote
            {...rest}
            source={content}
            options={{
              mdxOptions: {
                ...MDXOptions as any,
                development: isDevEnv,
              },
              scope: frontMatter,
            }}
            components={{
              ...CustomMDXComponents, ...(props.components || {})
            }}
          />
        </Suspense>
      </article>
    </section>
  );
};
