/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

// ref: https://github.com/snowpackjs/create-snowpack-app/tree/master/templates/app-template-react-typescript/types

// ESM-HMR Interface: `import.meta.hot`

interface ImportMeta {

  /*
   * TODO: Import the exact .d.ts files from "esm-hmr"
   * https://github.com/pikapkg/esm-hmr
   */
  hot: any;
  env: Record<string, any>;
}
