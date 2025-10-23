import Image from 'next/image';
import styles from './styles.module.scss';
import { useIsMobile } from '@/hooks/useIsMobile';
const Baner = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      <img className={styles.baner} src={isMobile ? '/baner_mobile.jpg' : '/baner.jpg'} />
    </div>
  );
};

export { Baner };
