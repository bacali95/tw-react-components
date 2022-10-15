const tailwind = require('prettier-plugin-tailwindcss');
const organizeImports = require('@trivago/prettier-plugin-sort-imports');

const combinedFormatter = {
  ...tailwind,
  parsers: {
    ...tailwind.parsers,
    ...Object.keys(organizeImports.parsers).reduce((acc, key) => {
      acc[key] = {
        ...tailwind.parsers[key],
        preprocess(code, options) {
          return organizeImports.parsers[key].preprocess(code, options);
        },
      };
      return acc;
    }, {}),
  },
};

module.exports = combinedFormatter;
