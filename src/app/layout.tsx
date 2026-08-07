import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import Header from '@/components/Header';
import AgeGate from '@/components/AgeGate';
import './globals.css';

const bodyFont = Manrope({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
});

const displayFont = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ukrcraft.com.ua'),
  title: '.G — craft dry gin',
  description:
    '.G — крафтовий сухий джин з зерна. Замовляйте пляшку 0.5л з доставкою по Україні.',
  openGraph: {
    title: '.G — craft dry gin',
    description:
      'Зерно • Ялівець • Коріандр\n.G — крафтовий сухий джин з зерна. Замовляйте пляшку 0.5л з доставкою по Україні.',
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: 'https://www.ukrcraft.com.ua/og.png',
        alt: '.G',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='uk'
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <AgeGate />
        <Header />
        {children}
        <Analytics />
        <Script id='microsoft-clarity' strategy='afterInteractive'>
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xy85v1anvt");`}
        </Script>
      </body>
    </html>
  );
}
