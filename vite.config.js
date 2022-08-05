import legacy from '@vitejs/plugin-legacy'

export default {
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `app.js`,
                chunkFileNames: `app.js`,
                assetFileNames: `app.[ext]`
            }
        }
    },
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11'],
            polyfills: false,
            renderLegacyChunks: false
        })
    ]
}
