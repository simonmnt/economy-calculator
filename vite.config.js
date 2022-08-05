import legacy from '@vitejs/plugin-legacy'

export default {
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `[name][hash].js`,
                chunkFileNames: `[name][hash].js`,
                assetFileNames: `[name][hash].[ext]`
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
