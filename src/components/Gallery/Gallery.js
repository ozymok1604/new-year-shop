'use client';
import { useEffect, useMemo, useState, useRef } from 'react';
import styles from './styles.module.scss';

const Gallery = ({ id, size }) => {
  const images = useMemo(
    () => [
      `/images/${id}/${size}.jpg`,
      `/images/${id}/top.jpg`,
      `/images/${id}/branch.jpg`,
      `/stand.webp`,
    ],
    [id, size]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const startX = useRef(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [id, size]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) < 50 || animating) return;

    if (diff > 0) {
      handleChange('next');
    } else {
      handleChange('prev');
    }
  };

  const handleChange = (dir) => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) =>
        dir === 'next' ? (prev + 1) % images.length : (prev - 1 + images.length) % images.length
      );
      setAnimating(false);
    }, 250);
  };

  return (
    <div className={styles.gallery}>
      <div
        className={`${styles.imageWrap} ${animating ? styles.fadeOut : styles.fadeIn}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={images[selectedIndex]}
          className={`${styles.image} ${
            direction === 'next' ? styles.slideLeft : styles.slideRight
          }`}
          src={images[selectedIndex]}
          alt="tree"
        />
      </div>

      <div className={styles.imagesRow}>
        {images.map((img, index) => (
          <img
            key={img}
            onClick={() => !animating && setSelectedIndex(index)}
            src={img}
            alt="thumbnail"
            className={selectedIndex === index ? styles.selectedSmallImage : styles.smallImage}
          />
        ))}
      </div>
    </div>
  );
};

export { Gallery };
