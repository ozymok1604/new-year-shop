import styles from './styles.module.scss';

const Sizes = ({ sizes, size, setSize }) => {
  return (
    <div>
      <div className={styles.label}>Оберіть висоту:</div>
      <div className={styles.sizesRow}>
        {sizes.map((it) => (
          <div
            key={it}
            onClick={() => setSize(it)}
            className={size == it ? styles.selectedSize : styles.size}
          >
            {it} м
          </div>
        ))}
      </div>{' '}
    </div>
  );
};

export { Sizes };
