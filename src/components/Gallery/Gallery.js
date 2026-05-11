'use client';
import { useEffect, useMemo, useState, useRef } from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';

const Gallery = ({ images, alt = 'Кросівки' }) => {
  const list = useMemo(() => (Array.isArray(images) && images.length > 0 ? images : []), [images]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const startX = useRef(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [list]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) < 50 || animating || list.length === 0) return;
    handleChange(diff > 0 ? 'next' : 'prev');
  };

  const handleChange = (dir) => {
    if (list.length === 0) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) =>
        dir === 'next' ? (prev + 1) % list.length : (prev - 1 + list.length) % list.length
      );
      setAnimating(false);
    }, 250);
  };

  if (list.length === 0) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div
        className={`${styles.imageWrap} ${animating ? styles.fadeOut : styles.fadeIn}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={list[selectedIndex]}
          src={list[selectedIndex]}
          alt={alt}
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 480px"
          className={`${styles.image} ${
            direction === 'next' ? styles.slideLeft : styles.slideRight
          }`}
        />
      </div>

      <div className={styles.imagesRow}>
        {list.map((img, index) => (
          <div
            key={`${img}-${index}`}
            className={selectedIndex === index ? styles.selectedSmallImage : styles.smallImage}
            onClick={() => !animating && setSelectedIndex(index)}
          >
            <Image
              src={img}
              alt=""
              width={80}
              height={80}
              loading="lazy"
              unoptimized
              className={styles.thumbImg}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Gallery };
