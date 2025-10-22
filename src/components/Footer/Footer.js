'use client';
import Link from 'next/link';
import { Phone, InstagramLogo, Clock } from '@phosphor-icons/react';
import styles from './styles.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Бренд/опис */}
        <div className={styles.col}>
          <div className={styles.brand}>new_year_shop.ua</div>
          <p className={styles.tagline}>Штучні ялинки преміум класу. Доставка по Україні.</p>
        </div>

        {/* Контакти */}
        <div className={styles.col}>
          <div className={styles.blockTitle}>Контакти</div>
          <a className={styles.link} href="tel:+380671234567">
            <Phone size={18} weight="bold" />
            <span>+38 (067) 123-45-67</span>
          </a>

          <Link
            className={styles.link}
            href="https://instagram.com/new_year_shop.ua"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram new_year_shop.ua"
          >
            <InstagramLogo size={18} weight="bold" />
            <span>@new_year_shop.ua</span>
          </Link>
        </div>

        {/* Години роботи */}
        <div className={styles.col}>
          <div className={styles.blockTitle}>Години роботи</div>
          <div className={styles.row}>
            <Clock size={18} weight="bold" />
            <div>
              <div>Пн–Пт: 09:00 – 19:00</div>
              <div>Сб–Нд: 10:00 – 17:00</div>
            </div>
          </div>
        </div>
      </div>

      {/* лінія + копірайт */}
      <div className={styles.bottom}>
        <span>© {year} new_year_shop.ua. Усі права захищено.</span>
      </div>
    </footer>
  );
}
