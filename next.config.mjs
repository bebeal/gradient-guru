import NextBundleAnalyzer from '@next/bundle-analyzer';
import withSVGR from './utils/SVGR.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  distDir: '.next',
  cleanDistDir: true,
  configOrigin: 'default',
  useFileSystemPublicRoutes: true,
  generateEtags: true,
  pageExtensions: ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx', 'mts', 'cts', 'md', 'mdx'],
  poweredByHeader: true,
  compress: true,
  optimizeFonts: true,
  excludeDefaultMomentLocales: true,
  reactProductionProfiling: false,
  reactStrictMode: false,
  outputFileTracing: true,
  staticPageGenerationTimeout: 60,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.json',
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**/*',
        pathname: '**/*',
      },
      {
        protocol: 'https',
        hostname: '**/*',
        pathname: '**/*'
      }
    ],
  },
  experimental: {
    scrollRestoration: true,
    webpackBuildWorker: true,
    serverMinification: true,
    clientRouterFilter: true,
    middlewarePrefetch: 'flexible',
    optimisticClientCache: true,
    isrFlushToDisk: true,
    optimizeCss: true, // ? https://github.com/vercel/next.js/issues/60473
    gzipSize: true,
    esmExternals: true,
    outputFileTracingRoot: process.env.NEXT_PRIVATE_OUTPUT_TRACE_ROOT || '',
    swcTraceProfiling: false,
    forceSwcTransforms: false,
    swcPlugins: undefined,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    mdxRs: false, // experimental rust-based mdx compiler
    nextScriptWorkers: false,
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withSVGR(nextConfig));
