/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os');
/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    styledComponents: true
  },
  webpack: (config, { isServer }) => {
    // https://stackoverflow.com/questions/76005377/module-not-found-cant-resolve-fs-nextjs-nextauth
    config.resolve = {
      ...config.resolve,
      fallback: {
        child_process: false,
        net: false,
        dns: false,
        tls: false,
        fs: false,
        request: false,
      },
    };
    // https://github.com/vercel/next.js/discussions/30870
    config.infrastructureLogging = {
        level: "error",
    };
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      )

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
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [{ loader: '@svgr/webpack', options: { dimensions: true, icon: true } }]
      },
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config
  },
  env: {},
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.json',
  },
  distDir: '.next',
  cleanDistDir: true,
  assetPrefix: '',
  configOrigin: 'default',
  useFileSystemPublicRoutes: true,
  generateBuildId: () => null,
  generateEtags: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  poweredByHeader: true,
  compress: true,
  analyticsId: process.env.VERCEL_ANALYTICS_ID || '',
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**/*',
        port: '',
        pathname: '**/*'
      }
    ],
    unoptimized: false,
  },
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  amp: {
    canonicalBase: '',
  },
  basePath: '',
  sassOptions: {},
  trailingSlash: false,
  i18n: null,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  excludeDefaultMomentLocales: true,
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  reactProductionProfiling: false,
  reactStrictMode: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  outputFileTracing: true,
  staticPageGenerationTimeout: 60,
  swcMinify: true,
  output: process.env.NEXT_PRIVATE_STANDALONE ? 'standalone' : undefined,
  modularizeImports: undefined,
  cacheHandler: undefined,
  // default to 50MB limit
  cacheMaxMemorySize: 50 * 1024 * 1024,
  experimental: {
    webpackBuildWorker: true,
    serverMinification: true,
    serverSourceMaps: false,
    caseSensitiveRoutes: false,
    useDeploymentId: false,
    deploymentId: undefined,
    useDeploymentIdServerActions: false,
    appDocumentPreloading: undefined,
    clientRouterFilter: true,
    clientRouterFilterRedirects: false,
    fetchCacheKeyPrefix: '',
    middlewarePrefetch: 'flexible',
    optimisticClientCache: true,
    manualClientBasePath: false,
    cpus: Math.max(
      1,
      (Number(process.env.CIRCLE_NODE_TOTAL) ||
        (os.cpus() || { length: 1 }).length) - 1
    ),
    memoryBasedWorkersCount: false,
    isrFlushToDisk: true,
    workerThreads: false,
    proxyTimeout: undefined,
    optimizeCss: false, // ? https://github.com/vercel/next.js/issues/60473
    nextScriptWorkers: false,
    scrollRestoration: false,
    externalDir: false,
    disableOptimizedLoading: false,
    gzipSize: true,
    craCompat: false,
    esmExternals: true,
    fullySpecified: false,
    outputFileTracingRoot: process.env.NEXT_PRIVATE_OUTPUT_TRACE_ROOT || '',
    swcTraceProfiling: false,
    forceSwcTransforms: false,
    swcPlugins: undefined,
    largePageDataBytes: 128 * 1000, // 128KB by default
    disablePostcssPresetEnv: undefined,
    amp: undefined,
    urlImports: undefined,
    adjustFontFallbacks: false,
    adjustFontFallbacksWithSizeAdjust: false,
    turbo: undefined,
    turbotrace: undefined,
    typedRoutes: false,
    instrumentationHook: false,
    bundlePagesExternals: false,
    webVitalsAttribution: ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"],
  },
}
