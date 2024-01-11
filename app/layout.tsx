import { Metadata } from 'next';
import Providers from '@/app/providers';

export const TITLE = 'Gradient Guru';
export const DESCRIPTION = 'GG';
export const THEME_COLOR = '#FFFFFF';
export const SITE_URL = 'https://gradient-guru.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
		default: TITLE,
		template: `${TITLE} • %s`,
	},
  description: DESCRIPTION,
  applicationName: TITLE,
	appleWebApp: {
		capable: true,
		title: TITLE,
		statusBarStyle: 'black',
	},
	formatDetection: {
		telephone: false,
	},
  icons: [
		// { rel: 'mask-icon', url: 'safari-pinned-tab.svg', color: THEME_COLOR },
		{ rel: 'shortcut icon', url: '/favicon.ico' },
		{ rel: 'icon', url: 'favicon-32x32.svg', sizes: '32x32' },
		{ rel: 'icon', url: 'favicon-16x16.svg', sizes: '16x16' },
		// { rel: 'apple-touch-icon', url: 'touch-icon-iphone.png' },
		{
			rel: 'apple-touch-icon',
			url: 'apple-touch-icon-152x152.png',
			sizes: '152x152',
		},
		{
			rel: 'apple-touch-icon',
			url: 'apple-touch-icon-180x180.png',
			sizes: '180x180',
		},
		{
			rel: 'apple-touch-icon',
			url: 'apple-touch-icon-167x167.png',
			sizes: '167x167',
		},
	],
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
				/>
			</head>
      <body suppressHydrationWarning className="p-0 m-0 h-screen w-screen min-h-[-webkit-fill-available] touch-none overscroll-none leading-none antialiased overflow-hidden">
        <Providers>
          <main className="h-full w-full overflow-auto relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
};

export default RootLayout;
