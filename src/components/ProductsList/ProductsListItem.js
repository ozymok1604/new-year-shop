import Link from 'next/link';
import styles from './style.module.scss';
import Image from 'next/image';
import { mediaUrls } from '@/data/products';

const ProductsListItem = ({ data }) => {
  const previewColor = data.colors[0]?.id ?? 'olive';
  const slots = data.mediaByColor?.[previewColor];
  const urls = slots?.length ? mediaUrls(data.id, previewColor, slots) : [];
  const mainImgUrl = urls[0] ?? `/images/${data.id}/${previewColor}/1.jpeg`;
  const thumbColors = (data.colors ?? [])
    .filter((c) => c.id !== previewColor)
    .slice(0, 2);

  return (
    <Link href={`/product?id=${data.id}`}>
      <div className={styles.product}>
        <div className={styles.fastLacing} aria-hidden>
          <Image
            src="/fast_lacing.png"
            alt=""
            width={200}
            height={80}
            className={styles.fastLacingImg}
            unoptimized
          />
        </div>
        <div className={styles.imageWrap}>
          <Image
            src={mainImgUrl}
            alt={data.name}
            fill
            priority
            unoptimized
            className={styles.image}
          />
          {thumbColors.length > 0 && data.mediaByColor && (
            <div className={styles.colorThumbsRow}>
              {thumbColors.map((c) => {
                const colorSlots = data.mediaByColor?.[c.id];
                const thumb =
                  colorSlots?.length > 0 ? mediaUrls(data.id, c.id, colorSlots)[0] : null;
                if (!thumb) return null;
                return (
                  <div key={`thumb-${c.id}`} className={styles.colorThumbWrap} title={c.label}>
                    <Image
                      src={thumb}
                      alt={c.label}
                      width={44}
                      height={44}
                      className={styles.colorThumb}
                      unoptimized
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <h4 className={styles.productName}>{data.name}</h4>
        </div>
        {(data.highlights?.length ?? 0) > 0 && (
          <div className={styles.highlights}>
            {data.highlights.map((line, i) => (
              <p key={i} className={styles.highlightLine}>
                {line}
              </p>
            ))}
          </div>
        )}
        <div className={styles.bottomBox}>
          <div className={styles.priceRow}>
            {typeof data.compareAtMore === 'number' && data.compareAtMore > 0 && (
              <p className={styles.oldPrice}>
                {(data.price + data.compareAtMore).toLocaleString('uk-UA')} грн
              </p>
            )}
            <p className={styles.price}>{data.price.toLocaleString('uk-UA')} грн</p>
          </div>

          <button className={styles.buyButton}>Купити</button>
        </div>
      </div>
    </Link>
  );
};

export { ProductsListItem };
