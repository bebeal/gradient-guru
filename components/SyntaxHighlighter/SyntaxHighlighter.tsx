'use client'

import { Prism as Highlighter } from 'react-syntax-highlighter';
import { SyntaxStyle, SyntaxStyles } from '@/components';

export interface SyntaxHighlighterProps {
  code: string;
  language?: any;
  inline?: boolean;
  style?: SyntaxStyle;
  className?: string;
}

export const SyntaxHighlighter = (props: SyntaxHighlighterProps) => {
  const {
    code,
    language,
    inline=false,
    style='custom',
    className='!rounded',
    ...rest
  } = props;
  const id = `code-highlighter-${language}`;
  const syntaxStyle = SyntaxStyles[style];

  return (
    <Highlighter id={id} language={language} style={syntaxStyle} useInlineStyles={true} className={className} {...rest}>
      {code}
    </Highlighter>
  )
};
SyntaxHighlighter.displayName = 'SyntaxHighlighter';
