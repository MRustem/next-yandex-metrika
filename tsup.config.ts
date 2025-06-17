import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  treeshake: true,
  sourcemap: true,
  splitting: false,
  minify: false,
  target: 'es2020',
  external: ['react', 'react-dom', 'next'],
  esbuildOptions(options) {
    options.alias = {
      '@': './src'
    }
    options.jsx = 'automatic'
  }
})