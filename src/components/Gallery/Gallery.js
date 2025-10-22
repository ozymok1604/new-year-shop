import { useEffect, useMemo, useState } from 'react';
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

  const [selected, setSelected] = useState(images[0]);

  useEffect(() => {
    setSelected(images[0]);
  }, [images[0]]);

  return (
    <div>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={selected} />
      </div>
      <div className={styles.imagesRow}>
        {images.map((img) => (
          <img
            key={img}
            onClick={() => setSelected(img)}
            src={img}
            className={selected == img ? styles.selectedSmallImage : styles.smallImage}
          />
        ))}
      </div>
    </div>
  );
};

export { Gallery };
