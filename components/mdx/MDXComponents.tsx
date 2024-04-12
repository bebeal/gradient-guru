'use client'

import React from 'react';
import type { MDXComponents } from 'mdx/types';
import Image, { ImageOptions } from '@tiptap/extension-image';

const ImageComponent = Image.configure({
  inline: true,                                  // Renders the image node inline, for example in a paragraph tag: <p><img src="spacer.gif"></p>. By default images are on the same level as paragraphs.
  allowBase64: true,                             // Allow images to be parsed as base64 strings <img src="data:image/jpg;base64...">.
});

// hmmm https://github.com/ueberdosis/tiptap/issues/2289
export const CustomMDXComponents: MDXComponents = {
  img: (props: any) => {
    console.log('props', props);
    const htmlOutput = ImageComponent.renderHTML({ ...props, node: { type: 'image', attrs: { src: props.src } } });
    console.log('htmlOutput', htmlOutput);
    return (
      <div className="relative w-full h-full border border-primary">
        {htmlOutput}
      </div>
    );
  }
};
