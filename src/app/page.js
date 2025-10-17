import { Baner } from '@/components/Baner/Baner';
import { Header } from '@/components/Header/Header';
import { SnowAnimation } from '@/components/SnowAnimation/SnowAnimation';
import styles from './page.module.scss';
import { ProductsList } from '@/components/ProductsList/ProductsList';
export default function Home() {
  return (
    <div className={styles.page}>
      <SnowAnimation />
      <Header />
      <Baner />
      <ProductsList />
    </div>
  );
}
