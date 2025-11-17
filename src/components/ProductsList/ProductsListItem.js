import Link from 'next/link';
import styles from './style.module.scss';
import Image from 'next/image';
const ProductsListItem = ({ data }) => {
  const mainImgUrl = `/images/${data.id}/2.3.jpg`;
  const price = data.prices.find((it) => it.size == 1.5).price;
  return (
    <Link href={`/product?id=${data.id}`}>
      <div className={styles.product}>
        <div className={styles.imageWrap}>
          <Image src={mainImgUrl} alt="Product image" fill priority className={styles.image} />
        </div>
        <div>
          <h4 className={styles.productName}>{data.name.slice(11)}</h4>
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.row}>
            <p className={styles.price}>Від {price + 1700} грн</p>
            <p className={styles.oldPrice}>{price + 1930} грн</p>
          </div>

          <button className={styles.buyButton}>Купити</button>
        </div>
      </div>
    </Link>
  );
};

export { ProductsListItem };
