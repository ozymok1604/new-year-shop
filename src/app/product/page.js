import { Suspense } from 'react';
import ProductContent from '@/components/ProductContent/ProductContent';

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

export default function ProductPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ProductContent />
    </Suspense>
  );
}
