'use client';

import { InstagramLogoIcon, PhoneCallIcon, ArrowDownIcon } from '@phosphor-icons/react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';

const Header = ({ scrollDown, scrollToSection }) => {
  return (
    <div className={styles.header} style={{ backgroundColor: scrollDown ? '#ba0207' : '#0f3f24' }}>
      {scrollDown ? (
        <ArrowDownIcon onClick={scrollToSection} color="white" size={30} />
      ) : (
        <Link href="/">
          <ArrowLeftIcon color="white" size={30} />
        </Link>
      )}

      <h2 className={styles.headerTitle}>new_year_shop.ua</h2>
      <div className={styles.row}>
        <Link
          className={styles.link}
          href="https://instagram.com/new_year_shop.ua"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram new_year_shop.ua"
        >
          <InstagramLogoIcon color="white" size={30} />
        </Link>
        <a href="tel:+380967070209">
          <PhoneCallIcon color="white" size={30} />
        </a>
      </div>
    </div>
  );
};

export { Header };
