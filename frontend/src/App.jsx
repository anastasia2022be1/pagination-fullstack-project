import { useEffect, useState } from "react";
import './App.css';

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
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3004/api/products?page=${page}&limit=${limit}&sort=${sort}&max_price=${maxPrice}`
        );
        if (!response.ok) {
          throw new Error("Error loading data");
        }
        const data = await response.json();
        
        // Append new products to the existing list, instead of replacing them
        setProducts(prevProducts => [...prevProducts, ...data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, sort, maxPrice]);

  // Reset product list when sorting or price filter changes
  const handleFilterChange = () => {
    setPage(1); // Reset to the first page
    setProducts([]); // Clear products to load fresh filtered data
  };

  return (
    <div className="app-container">
      <h1>Products list</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        <label>Sorting:</label>
        <select onChange={(e) => { setSort(e.target.value); handleFilterChange(); }}>
          <option value="name">By name</option>
          <option value="cheapest">By price (increasing)</option>
        </select>
        <label>Maximum price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => { setMaxPrice(e.target.value); handleFilterChange(); }}
        />
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
          </div>
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
