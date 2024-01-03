'use client'
// https://github.com/tldraw/make-real/blob/main/app/lib/uploadToThirdParty.ts

import sdk, { Project } from '@stackblitz/sdk';
import * as LZString from 'lz-string';

export const createStackBlitzProject = (html: string) => {
  const stacklitzProject: Project = {
		title: 'Make real from tldraw',
		description: 'Your AI generated example made at https://makereal.tldraw.com/',
		template: 'html',
		files: { 'index.html': html },
	}
	return stacklitzProject;
};

export const openStackBlitzUrl = (html: string) => {
  const project = createStackBlitzProject(html);
  sdk.openProject(project, { openFile: 'index.html' });
}

export const createReplitUrl = async (html: string): Promise<{ error: true; url: undefined } | { error: undefined; url: string }> => {
  console.log('fetching from replit');

  try {
    const response = await fetch('/api/replit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html,
      }),
    }).then(async (r) => r.json());

    if (response.success) {
      return { error: undefined, url: response.link };
    }
  } catch (e: any) {
    console.error(e.message);
  }

  return { error: true, url: undefined };
};

export const createCodePenProject = (html: string) => {
  return {
		title: 'Make real from tldraw',
		description: 'Your AI generated example made at https://makereal.tldraw.com/',
		html,
	};
};

export const createCodePenUrl = (html: any) => {
  const project = createCodePenProject(html);
	const url = new URL('https://codepen.io/pen/define')
	const params = new URLSearchParams()
	params.set('data', JSON.stringify(project))
	return `${url}?${params.toString()}`
};

// The following two functions are from
// https://github.com/codesandbox/codesandbox-importers/blob/master/packages/import-utils/src/api/define.17:41:36
// They are licensed under GPLv3 and from my understanding usning them here is fine since we are using GNU Affero General Public License v3.0
// https://en.wikipedia.org/wiki/GNU_Affero_General_Public_License#Compatibility_with_the_GPL
export const compress = (input: string) => {
	return LZString.compressToBase64(input)
		.replace(/\+/g, `-`) // Convert '+' to '-'
		.replace(/\//g, `_`) // Convert '/' to '_'
		.replace(/=+$/, ``) // Remove ending '='
}

export const createCodeSandboxProject = (html: string) => {
	const parameters = {
		files: {
			'index.html': {
				content: html,
				isBinary: false,
			},
		},
	}

	return compress(JSON.stringify(parameters))
}

export const createCodeSandboxUrl = (html: string) => {
  const project = createCodeSandboxProject(html)
	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${project}`
};
