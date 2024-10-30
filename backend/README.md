# Pagination Fullstack project- API

This is a **backend API** for managing products using **Express** and **MongoDB**. The API includes a seeder to populate the database with sample data.

## Features

- RESTful API for product management
- Pagination and sorting of products
- Basic error handling for validation and server errors
- Seeder script for populating the database with sample products

## Technologies Used

- **Node.js**
- **Express**
- **Mongoose**
- **MongoDB**
- **CORS**

## Setup Instructions

1. **Clone the repository:**

```
git clone https://github.com:anastasia2022be1/pagination-fullstack-project.git

cd pagination-fullstack-project/backend
```

2. Install dependencies:

```
npm install
```

3. Create a .env file:

Add your MongoDB connection string and port number.

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/myDB
```

4. Start the application:

Ensure MongoDB is running, then start the server:

```
npm run start
```

The server will run at http://localhost:3000.

## API Endpoints

**GET /api/products** - Get all products with pagination and sorting

### Pagination and Sorting

The API supports pagination and sorting for the product listing endpoint. You can control the pagination and sorting by providing query parameters:

- Query Parameters:
  - page: The current page number (default is 1).
  - limit: The number of products to return per page (default is 10).
  - sort: The field by which to sort the results. You can specify:
    - name for sorting by product name in ascending order (default).
    - cheapest for sorting by price in ascending order.
  - max_price: Filter products to include only those with a price less than the specified maximum price.

**Example Request:**

```
GET http://localhost:3000/api/products?page=2&limit=5&sort=cheapest&max_price=50
```

This request retrieves the second page of products, showing 5 products per page, sorted by price, and filtering out products that are priced above 50.

## Seeder

To seed the database with sample products, run:

```
npm run seed
```
