import createMDX from '@next/mdx';
import NextBundleAnalyzer from '@next/bundle-analyzer';
import withSVGR from './utils/SVGR.mjs';
import mdxOptions from './utils/mdx-options.mjs';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkFrontmatter from 'remark-frontmatter'

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
  pageExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx', 'md', 'mdx', 'mjs', 'cjs', 'mts', 'cts', 'csv'],
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
    return config;
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      ...mdxOptions.remarkPlugins,
    ],
    rehypePlugins: [
      ...mdxOptions.rehypePlugins,
    ]
  }
});

const config = withBundleAnalyzer(withMDX(withSVGR(nextConfig)));

export default config;
