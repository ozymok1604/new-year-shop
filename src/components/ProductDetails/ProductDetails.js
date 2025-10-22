'use client';
import { ShoppingCartIcon } from '@phosphor-icons/react';
import styles from './styles.module.scss';
import TrustBlocks from '../TrustBlocks/TrustBlocks';

const ProductDetails = ({ data, size }) => {
  // data: { size, price, bottomDiameter, numberOfTwigs, weightKg, packageSizes:{length,width,height} }

  const priceNow = (data.price ?? 0) + 1200;
  const priceOld = (data.price ?? 0) + 1630;

  return (
    <div>
      <div className={styles.row}>
        <div>
          <h3 className={styles.price}>{priceNow.toLocaleString('uk-UA')} грн</h3>
          <h3 className={styles.oldPrice}>{priceOld.toLocaleString('uk-UA')} грн</h3>
        </div>

        <button className={styles.buyButton} type="button">
          <ShoppingCartIcon size={22} weight="bold" />
          <span>Замовити</span>
        </button>
      </div>
      {/* Характеристики */}
      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span className={styles.specLabel}>Висота</span>
          <span className={styles.specValue}>
            {data.size?.toFixed ? data.size.toFixed(2) : data.size} м
          </span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specLabel}>Діаметр низу</span>
          <span className={styles.specValue}>{data.bottomDiameter} м</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specLabel}>Кількість гілок</span>
          <span className={styles.specValue}>{data.numberOfTwigs?.toLocaleString('uk-UA')}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specLabel}>Вага</span>
          <span className={styles.specValue}>{data.weightKg} кг</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specLabel}>Розміри коробки</span>
          <span className={styles.specValue}>
            {data.packageSizes?.length} × {data.packageSizes?.width} × {data.packageSizes?.height} м
          </span>
        </div>
      </div>
      <TrustBlocks />
    </div>
  );
};

export { ProductDetails };
