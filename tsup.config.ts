import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  treeshake: true,
  sourcemap: true,
  splitting: false,
  esbuildOptions(options) {
    options.alias = {
      '@': './src'
    }
  }
})