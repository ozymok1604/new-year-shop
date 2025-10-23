import { trees } from '@/data/trees';
import styles from './style.module.scss';
import { ProductsListItem } from './ProductsListItem';
const ProductsList = ({ ref }) => {
  return (
    <div className={styles.list} ref={ref}>
      {trees.map((data) => (
        <ProductsListItem key={data.id} data={data} />
      ))}
    </div>
  );
};

export { ProductsList };
