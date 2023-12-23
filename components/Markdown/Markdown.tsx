
import { IconSetCache, SyntaxHighlighter, Terminal } from '@/components';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export interface MarkdownProps extends Options {
  children: any;
}
export const Markdown = (props: MarkdownProps) => {
  const {
    remarkPlugins=[remarkGfm, remarkMath],
    children,
  } = props;

  return (
    <ReactMarkdown
      className="prose dark:prose-invert break-words prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={remarkPlugins}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) => {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        a: ({ node, children, ...props}) => {
          const linkProps = props;
          linkProps['rel'] = 'noopener noreferrer';
          return <a {...linkProps}>{children} <IconSetCache.Custom.ExternalLink /></a>
        },
        code: ({ node, inline, className, children, ...rest }: any) => {
          if (children.length) {
            if (children[0] == '▍') {
              return (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              )
            }

            children[0] = (children[0] as string).replace('`▍`', '▍')
          }

          const match = /language-(\w+)/.exec(className || '')
          const lanaguage = (match && match[1]) || '';

          if (inline) {
            return (<SyntaxHighlighter code={children} language={lanaguage} inline={inline} className={className} {...rest} />);
          }

          return (
            <Terminal
              key={Math.random()}
              language={lanaguage}
              code={String(children).replace(/\n$/, '')}
              {...rest}
            />
          )
        }
      }}
    >{children}</ReactMarkdown>
  );
};
