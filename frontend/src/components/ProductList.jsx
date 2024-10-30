import { useEffect, useState } from "react";
import "../styles/App.css";
import ProductCard from "./ProductCard.jsx"; // Import ProductCard component
import { fetchProducts } from "../utils/api.js"; // Import fetch function from utils

const ProductList = () => {
  const [products, setProducts] = useState([]); // Stores all loaded products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("name");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch products from the API
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(page, limit, sort, maxPrice);
        // Append new products to the existing list
        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, limit, sort, maxPrice]);

  // Reset product list when sorting or price filter changes
  const handleFilterChange = () => {
    setPage(1); // Reset to the first page
    setProducts([]); // Clear products to load fresh filtered data
  };

  // Обработчик для изменения максимальной цены
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value); // Устанавливаем максимальную цену
    handleFilterChange(); // Вызываем функцию для сброса и загрузки данных
  };

  return (
    <div className="app-container">
      <h1>Products list</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        <label>Sorting:</label>
        <select
          onChange={(e) => {
            setSort(e.target.value);
            handleFilterChange();
          }}>
          <option value="name">By name</option>
          <option value="cheapest">By price (increasing)</option>
        </select>
        <label>Maximum price:</label>
              <input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
              />
      </div>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {!loading && (
        <button className="load-more-btn" onClick={() => setPage(page + 1)}>
          Load more
        </button>
      )}
    </div>
  );
};

export default ProductList;
