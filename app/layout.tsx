import type { Metadata, Viewport } from 'next';
import Providers from '@/app/providers';

export const viewport: Viewport = {
  height: 'device-height',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};

export const metadata: Metadata = {
  title: 'Gradient Guru',
  description: 'GG',
  icons: {
    icon: './favicon.ico',
    shortcut: './favicon-16x16.png',
    apple: './apple-touch-icon.png'
  },
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="p-0 m-0 h-[100vh] w-[100vw] min-h-[-webkit-fill-available] touch-none overscroll-none leading-none antialiased">
        <Providers>
          <main suppressHydrationWarning className="h-full w-full overflow-auto relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
};

export default RootLayout;
