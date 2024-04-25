/** svg imports with a ?url suffix can be used as the src value in Image components per the configured webpack rule */
declare module '*.svg?url' {
  const defaultExport: string;
  export default defaultExport;
}

declare module '*.svg' {
  const content: React.FC<any>;
  export default content;
}

// Define vite/client type overrides before the the next line reference to vite/client
/// <reference types="vite/client" />
