import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path'; // part of pathname shortening package

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src")}]
    // replaces the @ with src directory so you dont need to type ../../.. etc. 
  }
})
