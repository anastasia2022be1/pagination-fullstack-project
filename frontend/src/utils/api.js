export const fetchProducts = async (page, limit, sort, maxPrice) => {
    const response = await fetch(
        `http://localhost:3004/api/products?page=${page}&limit=${limit}&sort=${sort}&max_price=${maxPrice}`
    );
    if (!response.ok) {
        throw new Error("Error loading data");
    }
    return await response.json();
};
