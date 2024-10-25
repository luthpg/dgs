import { defineBuildConfig } from 'unbuild';
export default defineBuildConfig({
  entries: [
    './src/cli/index.ts',
    './src/cli/bin.ts',
    {
      builder: 'mkdist',
      input: './src/types/',
      outDir: './dist/types/',
    },
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
