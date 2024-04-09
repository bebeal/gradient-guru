
import { CustomMDXComponents, MDXLayout } from '@/components';
import { MDXComponents } from 'mdx/types';

// This file is required to use MDX in `app` directory.
export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    // wrapper used when mdx files are directly imported and rendered as a reach component from app router
    wrapper: (props) => <MDXLayout {...props} useRemote={false} />,
    ...components,
    ...CustomMDXComponents,
  };
};
