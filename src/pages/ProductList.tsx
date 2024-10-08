import { useState } from "react";
import Product from "../components/product/Product";
import Input from "../components/input/Input";
import ToggleButton from "../components/toggleButton/ToggleButton";
import data from "../data/products.json";
import "./ProductList.scss";
import { IProduct } from "../types/product";

const ProductList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCheapest, setShowCheapest] = useState<boolean>(false);

  // Filtering logic
  const filteredProducts = data.filter((item: IProduct) =>
    (Object.keys(item) as (keyof typeof item)[]).some((key) =>
      item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  // Sorting logic for cheapest products
  const cheapestProducts = [...filteredProducts].sort(
    (a: IProduct, b: IProduct) => a.price - b.price
  );

  const renderProducts = () => {
    // Render either the top 5 cheapest or the full filtered list
    const productsToDisplay = showCheapest
      ? cheapestProducts.slice(0, 5)
      : filteredProducts;
    if (productsToDisplay && productsToDisplay.length > 0) {
      return productsToDisplay.map((product: IProduct) => (
        <Product key={product.name} name={product.name} price={product.price} />
      ));
    }
    return (
      <p className="error" data-testid="error-message">
        No products found :(
      </p>
    );
  };

  return (
    <>
      <div className="search-wrapper">
        <Input
          type="text"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for products..."
          className="search-input"
          id="search-input"
        />
        <ToggleButton
          value={showCheapest}
          onToggle={setShowCheapest}
          text="Show Cheapest"
          trueLabel="On"
          falseLabel="Off"
          className="custom-toggle"
          id="toggle-cheapest"
        />
      </div>
      <div className="results">{renderProducts()}</div>
    </>
  );
};
export default ProductList;
