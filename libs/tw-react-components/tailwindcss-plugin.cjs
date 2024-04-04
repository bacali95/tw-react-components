const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  () => {
    // do nothing
  },
  {
    theme: {
      extend: {
        keyframes: {
          slideDown: {
            from: { height: 0 },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          slideUp: {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: 0 },
          },
          slideDownAndFade: {
            from: { opacity: 0, transform: 'translateY(-2px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          slideLeftAndFade: {
            from: { opacity: 0, transform: 'translateX(2px)' },
            to: { opacity: 1, transform: 'translateX(0)' },
          },
          slideUpAndFade: {
            from: { opacity: 0, transform: 'translateY(2px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          slideRightAndFade: {
            from: { opacity: 0, transform: 'translateX(2px)' },
            to: { opacity: 1, transform: 'translateX(0)' },
          },
        },
        animation: {
          slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },
    },
  },
);
