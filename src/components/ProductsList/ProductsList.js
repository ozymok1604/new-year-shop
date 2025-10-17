import { trees } from '@/data/trees';
import styles from './style.module.scss';
import { ProductsListItem } from './ProductsListItem';
const ProductsList = () => {
  return (
    <div className={styles.list}>
      {trees.map((data) => (
        <ProductsListItem data={data} />
      ))}
    </div>
  );
};

export { ProductsList };
