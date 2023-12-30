'use client'

import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { SyntaxStyle, SyntaxStyles } from '@/components';

export interface HighlighterProps extends Omit<SyntaxHighlighterProps, 'children'> {
  code: string;
  language?: any;
  inline?: boolean;
  syntaxStyle?: SyntaxStyle;
  className?: string;
}

export const Highlighter = (props: HighlighterProps) => {
  const {
    code,
    language,
    inline=false,
    syntaxStyle='custom',
    className='!rounded',
    ...rest
  } = props;
  const id = `code-highlighter-${language}`;
  const syntax = SyntaxStyles[syntaxStyle];

  return (
    <SyntaxHighlighter id={id} language={language} style={syntax} useInlineStyles={true} className={className} {...rest}>
      {code}
    </SyntaxHighlighter>
  )
};
Highlighter.displayName = 'Highlighter';
