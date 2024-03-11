import path from 'path';

const infrastructureLogging = {
    level: "error",
};

const fallback = {
  http2: false,
  child_process: false,
  net: false,
  dns: false,
  tls: false,
  fs: false,
  request: false,
};

const addSVGRRule = (config) => {
  // Grab the existing rule that handles SVG imports
  const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

  if (fileLoaderRule) {
    const resourceQueryNotArray = fileLoaderRule?.resourceQuery?.not ? [...fileLoaderRule.resourceQuery.not] : [];
  
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer || /\.[jt]sx?$/,
        resourceQuery: { not: [...resourceQueryNotArray, /url/] }, // Exclude if *.svg?url
        use: [{ loader: '@svgr/webpack', options: { dimensions: true, icon: true } }]
      },
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
  } else {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { dimensions: true, icon: true } }]
    });
  }

  return config;
};

// For standalone Webpack setups
const configureWebpackConfig = (config) => {
  config = {
    ...config,
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.svg'],
      fallback: fallback,
    },
    infrastructureLogging: infrastructureLogging,
  }
  return addSVGRRule(config);
};

// for the `webpack` function in `next.config.js`
const configureWebpackForNextjs = (config) => {
  // https://stackoverflow.com/questions/76005377/module-not-found-cant-resolve-fs-nextjs-nextauth
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      ...fallback,
    }
  };
  // https://github.com/vercel/next.js/discussions/30870
  config.infrastructureLogging = infrastructureLogging;
  return addSVGRRule(config);
};

const withSVGR = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack: (config) => {
      nextConfig.webpack && nextConfig.webpack(config);
      return configureWebpackForNextjs(config);
    },
  };
}

export default withSVGR;
