import Image from 'next/image';
import styles from './styles.module.scss';
const Baner = () => {
  return (
    <div>
      <img className={styles.baner} src={'/baner_mobile.jpg'} />
    </div>
  );
};

export { Baner };
