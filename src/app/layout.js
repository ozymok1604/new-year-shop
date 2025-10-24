import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Новий рік — Купити ялинку онлайн | New Year Shop',
  description:
    'Обери живу або штучну ялинку з доставкою по Україні. Найкраща якість і святковий настрій!',
  keywords: ['ялинка', 'новий рік', 'декор', 'купити ялинку', 'штучна ялинка'],
  openGraph: {
    title: 'New Year Shop 🎄',
    description: 'Обери ідеальну ялинку для свята!',
    url: 'https://new-year-shop.vercel.app/',
    siteName: 'New Year Shop',
    images: [
      {
        url: '/baner.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
