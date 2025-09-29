// FIX: The reference to "vite/client" was causing an error.
// It has been replaced with a manual type definition for `process.env.API_KEY`
// to align with the @google/genai coding guidelines and resolve type errors.
declare namespace NodeJS {
    interface ProcessEnv {
        readonly API_KEY: string;
    }
}
