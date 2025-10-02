// FIX: Removed `/// <reference types="vite/client" />` to resolve "Cannot find type definition file" error.
// This is safe as the project doesn't use Vite-specific client types like `import.meta.env`.

// This file provides type definitions for the `process.env.API_KEY` that is
// injected by the Vite config. This satisfies TypeScript's type checker
// in the client-side code during the build process.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
    }
  }
}

// FIX: Make this file a module by exporting an empty object.
// This is necessary for 'declare global' to work correctly, which fixes the
// "Augmentations for the global scope can only be directly nested in external modules..." error.
export {};
