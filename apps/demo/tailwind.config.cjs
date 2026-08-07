const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}')],
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require(join(__dirname, '../../libs/tw-react-components/tailwindcss-plugin.cjs')),
  ],
};
