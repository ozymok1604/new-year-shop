const ProductsListItem = ({ data }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <img height={'300px'} width={'200px'} src="/images/kovalivska/2.5.jpg" />
    </div>
  );
};

export { ProductsListItem };
