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
  title: '.G',
  description: 'Ukrainian dry gin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
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
