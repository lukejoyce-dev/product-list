import "./Product.scss";
interface ProductProps {
  name: string;
  price: number;
}
const Product: React.FC<ProductProps> = ({ name, price }) => {
  return (
    <div className="product">
      <p>
        <b>{name}</b>
      </p>
      <p>{price}</p>
    </div>
  );
};
export default Product;
