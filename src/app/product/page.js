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
import ProductContent from '@/components/ProductContent/ProductContent';

export default function ProductPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ProductContent />
    </Suspense>
  );
}
