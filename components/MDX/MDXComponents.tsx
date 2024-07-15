'use client'

import type { MDXComponents } from 'mdx/types';
// import Image, { ImageOptions } from '@tiptap/extension-image';

// const ImageNode = Image.configure({
//   inline: true,                                  // Renders the image node inline, for example in a paragraph tag: <p><img src="spacer.gif"></p>. By default images are on the same level as paragraphs.
//   allowBase64: true,                             // Allow images to be parsed as base64 strings <img src="data:image/jpg;base64...">.
// }) as any;

// console.log(`ImageNode`, ImageNode)
// const html: any = ImageNode?.config?.renderHTML?.({
//   src: mountains.src,
//   height: 200,
//   width: 200,
//   alt: "mountains",
// } as any);

// console.log(`html`, html)

// hmmm https://github.com/ueberdosis/tiptap/issues/2289
export const CustomMDXComponents: MDXComponents = {
  
};
