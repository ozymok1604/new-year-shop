import { products } from '@/data/products';
import styles from './style.module.scss';
import { ProductsListItem } from './ProductsListItem';
const ProductsList = () => {
  return (
    <div className={styles.list}>
      {products.map((data) => (
        <ProductsListItem key={data.id} data={data} />
      ))}
    </div>
  );
};

export { ProductsList };
