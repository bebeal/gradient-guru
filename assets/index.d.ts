/** svg imports with a ?url suffix can be used as the src value in Image components per the configured webpack rule */
declare module '*.svg?url' {
  import { StaticImport } from "next/dist/shared/lib/get-img-props";

  const defaultExport: StaticImport | string;
  export default defaultExport;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
