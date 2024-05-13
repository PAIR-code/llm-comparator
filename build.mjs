import * as esbuild from 'esbuild'
import { litCssPlugin } from 'esbuild-plugin-lit-css';

async function main() {
  await esbuild.build({
    entryPoints: ['client/index.ts'],
    bundle: true,
    sourcemap: true,
    outfile: 'dist/dev_sources.concat.js',
    plugins: [
      litCssPlugin(),
    ],
  });
}

main();
