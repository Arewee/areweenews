import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes the VITE_API_KEY environment variable available as process.env.API_KEY
    // in the client-side code. This is a bridge to meet the Gemini SDK's expectation
    // of using process.env while leveraging Vite's secure env variable handling.
    // In Vercel/Netlify, create an environment variable named VITE_API_KEY.
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})