'use client';
import { Gallery } from '@/components/Gallery/Gallery';
import { Sizes } from '@/components/Sizes/Sizes';
import { trees } from '@/data/trees';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import styles from './styles.module.scss';
import { Header } from '@/components/Header/Header';
import { ProductDetails } from '@/components/ProductDetails/ProductDetails';
import Footer from '@/components/Footer/Footer';
import { SnowAnimation } from '@/components/SnowAnimation/SnowAnimation';

export default function ProductContent() {
  const sp = useSearchParams();
  const id = sp.get('id');
  const productData = trees.find((it) => it.id == id);

  if (!productData) {
    return (
      <>
        <Header />
        <div className={styles.page}>
          <p>Product not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const [size, setSize] = useState('2.1');
  const sizes = productData.prices.map((it) => it.size);
  const productDetails = productData.prices.find((it) => it.size == size);

  return (
    <Suspense>
      <>
        <Header />
        <div className={styles.page}>
          <Gallery id={productData.id} size={size} />
          <Sizes sizes={sizes} setSize={setSize} size={size} />
          <ProductDetails data={{ ...productDetails, name: productData.name }} size={size} />
        </div>
        <Footer />
      </>
    </Suspense>
  );
}
