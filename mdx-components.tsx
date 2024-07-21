import { MDXComponents } from 'mdx/types';
import { CustomMDXComponents, MDXLayout } from '@/components';

// This file is required to use MDX in `app` directory.
export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  const wrapper = (props: any) => <MDXLayout {...props} useRemote={false} />;
  return {
    // wrapper used when mdx files are directly imported and rendered as a reach component from app router
    wrapper,
    ...components,
    ...CustomMDXComponents,
  };
};
