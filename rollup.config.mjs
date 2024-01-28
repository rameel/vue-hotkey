import size from "rollup-plugin-bundle-size";
import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";

const terserOptions = {
    output: {
        comments: false
    },
    compress: {
        passes: 5,
        ecma: 2020,
        drop_console: false,
        drop_debugger: true,
        pure_getters: true,
        arguments: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true
    }
};

export default [{
    input: "src/index.ts",
    output: [{
        file: "dist/vue-hoteky.esm.js",
        format: "esm"
    }, {
        file: "dist/vue-hoteky.esm.min.js",
        format: "esm",
        plugins: [terser(terserOptions)]
    }, {
        name: "window",
        file: "dist/vue-hotkey.js",
        format: "iife",
        extend: true
    }, {
        name: "window",
        file: "dist/vue-hotkey.min.js",
        format: "iife",
        extend: true,
        plugins: [terser(terserOptions)]
    }],
    plugins: [
        resolve(),
        typescript(),
        size()
    ]
}]
