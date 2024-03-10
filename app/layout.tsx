import type { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import { DocTitleConfig } from '@/app/doc-config';
import Providers from '@/app/providers';

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
    default: DocTitleConfig.title,
    template: `${DocTitleConfig.title} • %s`,
  },
  description: DocTitleConfig?.description || '',
  applicationName: DocTitleConfig.title,
  appleWebApp: {
    title: DocTitleConfig.title,
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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
      </head>
      <body suppressHydrationWarning={true} className="p-0 m-0 h-screen w-screen min-h-[-webkit-fill-available] touch-none overscroll-none leading-none antialiased overflow-hidden">
        <Providers>
          <main className="relative h-screen w-screen overflow-auto bg-primary text-primary">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
