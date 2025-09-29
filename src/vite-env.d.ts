/// <reference types="vite/client" />

// This file provides type definitions for the `process.env.API_KEY` that is
// injected by the Vite config. This satisfies TypeScript's type checker
// in the client-side code during the build process.
declare var process: {
    env: {
      API_KEY: string;
    }
};
