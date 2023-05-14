import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    build: {
        rollupOptions: {
           // external: ['@tinymce/tinymce-react'],
            output: {
                //globals: {
                //    '@tinymce/tinymce-react': 'window.tinymce'
                //},
                chunkFileNames: 'chunks/[name]-[hash].js',
            },
            manualChunks: {
                react: ['react', 'react-dom', 'react-is', 'prop-types'],
            },
        }
    },
})
