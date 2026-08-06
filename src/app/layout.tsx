import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
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
      '.G — крафтовий сухий джин з зерна. Замовляйте пляшку 0.5л з доставкою по Україні.',
    locale: 'uk_UA',
    type: 'website',
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
      </body>
    </html>
  );
}
