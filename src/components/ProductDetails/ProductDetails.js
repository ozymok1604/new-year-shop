'use client';
import { useState } from 'react';
import { ShoppingCartIcon } from '@phosphor-icons/react';
import styles from './styles.module.scss';
import TrustBlocks from '../TrustBlocks/TrustBlocks';
import DeliveryBottomSheet from '../NovaPostDivisionPicker/DeliveryBottomSheet';

const ProductDetails = ({ data, size }) => {
  const [orderInfo, setOrderInfo] = useState(null);
  console.log(data, 'data');

  const priceNow = (data.price ?? 0) + 1200;
  const priceOld = (data.price ?? 0) + 1630;

  const handleSubmit = (order) => {
    console.log('✅ Замовлення:', {
      ...order,
      product: {
        name: `Ялинка ${size} м`,
        price: priceNow,
      },
    });

    setOrderInfo(order);
  };

  return (
    <div>
      <h2 className={styles.name}>{data.name}</h2>
      <div className={styles.row}>
        <div>
          <h3 className={styles.price}>{priceNow.toLocaleString('uk-UA')} грн</h3>
          <h3 className={styles.oldPrice}>{priceOld.toLocaleString('uk-UA')} грн</h3>
        </div>

        {/* ✅ Кнопка відкриває bottom sheet */}
        <DeliveryBottomSheet
          product={{
            name: `${data.name + ' ' + size} м`,
            price: priceNow,
            size: data.size,
          }}
          onSubmit={handleSubmit}
        />
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

      <div className={styles.description}>
        Наші ялинки збираються за кілька хвилин із <b>3 частин</b>, тож святковий настрій не змусить
        себе чекати. <b>Металева підставка</b> гарантує надійну стійкість, а гілля зі{' '}
        <b>сталі, ПЕ та ПВХ-плівки</b> виглядає максимально природно й служить роками. Після свят
        дерево легко сховати в <b>картонну коробку</b> — компактно, акуратно, без сміття та щорічних
        витрат.
      </div>

      <TrustBlocks />
    </div>
  );
};

export { ProductDetails };
