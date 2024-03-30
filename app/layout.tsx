import type { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import { DocConfig } from '@/app/config';
import Providers from '@/app/providers';
import { getEnvVariable } from '@/utils';

const robots: string | Robots | null | undefined = {
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

export const metadata: Metadata = {
  robots,
  title: {
    default: DocConfig.title,
    template: `${DocConfig.title} • %s`,
  },
  description: DocConfig?.description || '',
  metadataBase: new URL(DocConfig?.url || ''),
  applicationName: DocConfig.title,
  appleWebApp: {
    title: DocConfig.title,
    capable: true,
    statusBarStyle: 'black',
  },
  formatDetection: {
    telephone: false,
  },
  icons: [{ rel: 'shortcut icon', url: '/favicon.ico' }],
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
