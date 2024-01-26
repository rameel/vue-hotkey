import terser from "@rollup/plugin-terser";
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts";
import {
    defineConfig
} from "vite"

export default defineConfig({
    build: {
        lib: {
            name: "Hotkey",
            entry: "src/index.ts",
            fileName: "vue-hotkey",
        },
        rollupOptions: {
            external: ["vue"],
            output: [{
                dir: "dist",
                format: "esm",
                globals: {
                    vue: "Vue"
                }
            }, {
                name: "window",
                dir: "dist",
                entryFileNames: "vue-hotkey.js",
                format: "iife",
                extend: true,
                globals: {
                    vue: "Vue"
                }
            }, {
                name: "window",
                dir: "dist",
                entryFileNames: "vue-hotkey.min.js",
                format: "iife",
                extend: true,
                plugins: [terser({
                    output: {
                        comments: false
                    },
                    compress: {
                        passes: 10,
                        ecma: 2020,
                        drop_console: false,
                        drop_debugger: true,
                        pure_getters: true,
                        arguments: true,
                        unsafe_comps: true,
                        unsafe_math: true,
                        unsafe_methods: true,
                    }
                })],
                globals: {
                    vue: "Vue"
                }
            }]
        },
        target: "es2020",
        minify: false
    },
    plugins: [
        dts({ rollupTypes: true }),
        vue()
    ],
});
