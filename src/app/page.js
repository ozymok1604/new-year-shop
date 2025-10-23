'use client';
import { Baner } from '@/components/Baner/Baner';
import { Header } from '@/components/Header/Header';
import { SnowAnimation } from '@/components/SnowAnimation/SnowAnimation';
import styles from './page.module.scss';
import { ProductsList } from '@/components/ProductsList/ProductsList';
import { useRef } from 'react';
export default function Home() {
  const ref = useRef(null);
  const scrollToSection = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className={styles.page}>
      <SnowAnimation />
      <Header scrollDown scrollToSection={scrollToSection} />
      <Baner />
      <ProductsList ref={ref} />
    </div>
  );
}
