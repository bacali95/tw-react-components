const { withNx } = require('@nx/rollup/with-nx');

module.exports = withNx({
  outputPath: '../../dist/libs/tw-react-components',
  main: './src/index.ts',
  tsConfig: './tsconfig.lib.json',
  format: ['esm'],
  compiler: 'tsc',
  external: 'all',
  generateExportsField: true,
  babelUpwardRootMode: true,
  updateBuildableProjectDepsInPackageJson: true,
  assets: [
    {
      glob: '(index.css|tailwindcss-plugin.cjs)',
      input: 'libs/tw-react-components',
      output: '/',
    },
  ],
});
