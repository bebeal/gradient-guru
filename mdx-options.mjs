
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const mdxOptions = {
  remarkPlugins: [
    remarkGfm,
    remarkMath,
  ],
  rehypePlugins: [
    rehypeKatex,
  ],
};

export default mdxOptions;
