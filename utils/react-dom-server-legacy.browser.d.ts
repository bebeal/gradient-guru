/// <reference types="legacy-server-functions.d.ts" />

// https://github.com/vercel/next.js/discussions/58305
declare module 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development' {
  import ReactDOMServer from 'react-dom/server';
  export = ReactDOMServer as any;
}

// https://github.com/vercel/next.js/discussions/58305
declare module 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.production' {
  import ReactDOMServer from 'react-dom/server';
  export = ReactDOMServer as any;
}
