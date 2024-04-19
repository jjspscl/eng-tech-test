import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  watch: 'dist/ts',
  bundle: true,
  format: 'cjs',
});