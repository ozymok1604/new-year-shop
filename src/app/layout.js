import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
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

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}

        {/* ✅ TikTok Pixel через Next.js Script */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
              ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                  t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                };
              };
              for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
              ttq.instance = function (t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                return e;
              };
              ttq.load = function (e, n) {
                var r = "https://analytics.tiktok.com/i18n/pixel/events.js",
                    o = n && n.partner;
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = r;
                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date;
                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};
                n = d.createElement("script");
                n.type = "text/javascript";
                n.async = true;
                n.src = r + "?sdkid=" + e + "&lib=" + t;
                e = d.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(n, e);
              };
              ttq.load('D3TL3LRC77U53GBVVNPG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      </body>
    </html>
  );
}
