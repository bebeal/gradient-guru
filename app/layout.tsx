import type { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import { DocConfig } from '@/app/config';
import Providers from '@/app/providers';

// https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
export const runtime = 'nodejs';

// A robots.txt file tells search engine crawlers which URLs the crawler can access on your site. This is used mainly to avoid overloading your site with requests.
// See https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots https://developers.google.com/search/docs/crawling-indexing/robots/intro#:~:text=A%20robots.txt%20file%20tells,web%20page%20out%20of%20Google
const robots: Robots | string | null | undefined = {
  index: false,
  follow: true,
  nocache: true,
  googleBot: {
    index: true,
    follow: false,
    noimageindex: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export const icons = [
  // { rel: 'mask-icon', url: 'safari-pinned-tab.svg', color: THEME_COLOR },
  { rel: 'shortcut icon', url: '/favicon.ico' },
  { rel: 'icon', url: '/favicon-32x32.svg', sizes: '32x32' },
  { rel: 'icon', url: '/favicon-16x16.svg', sizes: '16x16' },
  // { rel: 'apple-touch-icon', url: 'touch-icon-iphone.png' },
  {
    rel: 'apple-touch-icon',
    url: '/apple-touch-icon-152x152.png',
    sizes: '152x152',
  },
  {
    rel: 'apple-touch-icon',
    url: '/apple-touch-icon-180x180.png',
    sizes: '180x180',
  },
  {
    rel: 'apple-touch-icon',
    url: '/apple-touch-icon-167x167.png',
    sizes: '167x167',
  },
];

export const metadata: Metadata = {
  robots,
  icons,
  applicationName: DocConfig.title,
  appleWebApp: {
    capable: true,
    title: DocConfig.title,
    statusBarStyle: 'black',
  },
  description: DocConfig?.description || '',
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(DocConfig?.url || ''),
  title: {
    default: DocConfig.title,
    template: `${DocConfig.title} • %s`,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
      </head>
      <body suppressHydrationWarning className="p-0 m-0 h-screen min-h-[-webkit-fill-available] touch-none overscroll-none leading-none antialiased overflow-hidden">
        <Providers>
          <main className="relative h-screen w-screen overflow-auto bg-primary text-primary">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
