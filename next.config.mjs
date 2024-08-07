import NextBundleAnalyzer from '@next/bundle-analyzer';
import withSVGR from './utils/SVGR.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  pageExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx', 'md', 'mjs', 'cjs', 'mts', 'cts', 'csv'],
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
  async headers() {
    return [
      {
        // This applies to all routes
        source: '/:path*',
        headers: [
          { // controls DNS prefetching, allowing browsers to proactively perform domain name resolution
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          { // indicates whether the site should be allowed to be displayed within an iframe, protects against clickjacking attacks
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          { // prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set. This can prevent XSS exploits for websites that allow users to upload and share files.
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          { // controls how much information the browser includes when navigating from the current website (origin) to another.
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
      {
        source: '/api/auth/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
  experimental: {
    // serverComponentsExternalPackages: ["yjs"],
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
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'raw-loader'
    });
    // https://github.com/yjs/yjs/issues/438#issuecomment-2225079409
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
      config.resolve.alias['y-prosemirror'] = path.resolve(__dirname, 'node_modules/y-prosemirror');
    }
    return config;
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config = withBundleAnalyzer(withSVGR(nextConfig));

export default config;
