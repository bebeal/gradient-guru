const postcssConfig = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {
      // https://tailwindcss.com/docs/optimizing-for-production
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
  },
};

module.exports = postcssConfig;
