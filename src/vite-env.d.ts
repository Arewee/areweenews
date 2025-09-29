/// <reference types="vite/client" />

// This file provides type definitions for the `process.env.API_KEY` that is
// injected by the Vite config. This satisfies TypeScript's type checker
// in the client-side code. This augmentation avoids redeclaring the global
// `process` variable, which can cause conflicts.

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
  }
}
