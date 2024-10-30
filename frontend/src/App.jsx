import { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('name');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `http://localhost:3000/api/products?page=${page}&limit=${limit}&sort=${sort}&max_price=${maxPrice}`
                );
                if (!response.ok) {
                    throw new Error('Error loading data');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit, sort, maxPrice]); // Зависимости: вызываем fetch при изменении любого из этих параметров

    return (
        <div>
            <h1>Products list</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                <label>Sorting:</label>
                <select onChange={(e) => setSort(e.target.value)}>
                    <option value="name">By name</option>
                    <option value="cheapest">By price (increasing)</option>
                </select>
            </div>
            <div>
                <label>Maximum price:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <div>
                {products.map(product => (
                    <div key={product._id}>
                        <h2>{product.name}</h2>
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setPage(page + 1)}>Load more</button>
        </div>
    );
};

export default ProductList;
