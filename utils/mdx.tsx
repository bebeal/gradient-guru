import fs from 'fs';
import path from 'path';
import Image, { ImageProps } from 'next/image';
import type { MDXComponents } from 'mdx/types';

export const ASSETS_DIR = 'assets/mdx';

export const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const frontMatter: Partial<any> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    frontMatter[key.trim()] = value;
  });

  return { frontMatter, content };
};

export const getMDXFiles = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => ['.mdx', '.md'].includes(path.extname(file)));
};

export const readMDXFile = (filePath: string) => {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
};

export const getMDXData = (dir: string) => {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { frontMatter, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      children: content,
      slug,
      frontMatter,
    };
  });
};

export const getMDX = () => {
  return getMDXData(path.join(process.cwd(), ASSETS_DIR));
};

// The components you can overwrite use their standard HTML names. Normally, in markdown, those names are:
// a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul.
// With remark-gfm (see guide), you can also use: del, input, section, sup, table, tbody, td, th, thead, and tr.
// guide: https://mdxjs.com/guides/gfm/
