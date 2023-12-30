import { CustomSyntaxStyle } from './CustomSyntaxStyle';

const syntaxStyles = ['custom'] as const;
export type SyntaxStyle = (typeof syntaxStyles)[number];

export const SyntaxStyles: Record<SyntaxStyle, any> = {
  custom: CustomSyntaxStyle,
};
