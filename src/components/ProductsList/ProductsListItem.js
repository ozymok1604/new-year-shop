import Link from 'next/link';
import styles from './style.module.scss';
const ProductsListItem = ({ data }) => {
  const mainImgUrl = `/images/${data.id}/2.3.jpg`;
  const price = data.prices.find((it) => it.size == 1.5).price;
  return (
    <div className={styles.product}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={mainImgUrl} />
      </div>
      <div>
        <h4 className={styles.productName}>{data.name.slice(11)}</h4>
      </div>
      <div className={styles.bottomBox}>
        <div>
          <p className={styles.price}>Від {price + 1200} грн</p>
          <p className={styles.oldPrice}>{price + 1630} грн</p>
        </div>
        <Link href={`/product?id=${data.id}`}>
          <button className={styles.buyButton}>Замовити</button>
        </Link>
      </div>
    </div>
  );
};

export { ProductsListItem };
