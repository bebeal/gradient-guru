'use client'

export const ItalicString = `*Italic*	_Italic_`;
export const BoldString = `**Bold**	__Bold__`;
export const BoldItalicString = `***BoldItalic***	___BoldItalic___`;
export const StrikethroughString = `~~Strikethrough~~`;
export const LinkString = `[Link](https://www.google.com)`;
export const ImageString = `![Image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)`;
export const CodeString = `Inline \`Code\` Wow`;
export const CodeBlockString = `\`\`\`
CodeBlock
\`\`\``;
const PythonCodeBlock: string = `
\`\`\`python
import numpy as np

def dot_product(v1, v2):
    return np.dot(v1, v2)

def cross_product(v1, v2):
    return np.cross(v1, v2)

def mat_mul(m1, m2):
    return np.matmul(m1, m2)
\`\`\`
`;
export const BlockquoteString = `> Blockquote 1\n> Blockquote 2\n> Blockquote 3`;
export const HeadingString = `# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6`;
export const HorizontalRuleString = `---`;
export const UnorderedListString = `* Item 1\n* Item 2\n    * Nested Item 1\n    * Nested Item 2\n* Item 3`;
export const OrderedListString = `1. Item 1\n2. Item 2\n3. Item 3`;
export const TableString = `| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |`;
export const TaskListString = `- [x] Task 1\n- [ ] Task 2\n- [ ] Task 3`;
export const EmojiString = `:smile:`;
export const MathString = `  This is inline math: $e = mc^2$.

This is block math:

$$\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$
`;
export const FootnoteString = `[^1]\n\n[^1]: Footnote 1`;
export const AbbreviationString = `*[HTML]: Hyper Text Markup Language\n\nThe HTML specification`;
export const DefinitionString = `Term\n: Definition`;
const GFMDocString = `---
layout: GFM
---

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| Column 1 | Column 2 | Column 3 | Column 4 |
| - | :- | -: | :-: |
| Item 1 | Item 2 | Item 3 | Item 4 |

## Tasklist

* [ ] to do
* [x] done
`
const Colors: string = `
#ef4591

#ef459177

#ffef45
`


export const markdownString = `
${ItalicString}\n
${BoldString}\n
${BoldItalicString}\n
${StrikethroughString}\n
${LinkString}\n
${ImageString}\n
${CodeString}\n
${CodeBlockString}\n
${PythonCodeBlock}\n
${BlockquoteString}\n
${HeadingString}\n
${HorizontalRuleString}\n
${UnorderedListString}\n
${OrderedListString}v
${TableString}\n
${TaskListString}\n
${EmojiString}\n
${MathString}\n
${FootnoteString}\n
${AbbreviationString}\n
${DefinitionString}\n
${GFMDocString}\n
${Colors}\n
`;
