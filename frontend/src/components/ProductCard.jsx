import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductCard;
