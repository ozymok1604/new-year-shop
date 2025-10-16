'use client';

import { InstagramLogoIcon, PhoneCallIcon, ArrowDownIcon } from '@phosphor-icons/react';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <ArrowDownIcon color="white" size={30} />
      <h2 className={styles.headerTitle}>new_year_shop.ua</h2>
      <div className={styles.row}>
        <InstagramLogoIcon color="white" size={30} />
        <PhoneCallIcon color="white" size={30} />
      </div>
    </div>
  );
};

export { Header };
