# Pagination Fullstack project- React App

#### Description

This is a product listing application that displays a list of products with the ability to sort and filter by price. It is built using React and interacts with an API to fetch product data.

## Installation

1. Clone the repository:

```
git clone https://github.com:anastasia2022be1/pagination-fullstack-project.git
```

2. Navigate to the project directory:

```
cd pagination-fullstack-project/frontend
```

3. Install dependencies:

```
npm install
```

4. Ensure that the API server is running at http://localhost:3004 or update the API configuration in the code.

5. Start the application:

```
npm run dev
```

## Usage

- Upon launching the application, you will see a list of products.
- You can sort the products by name or price.
- Enter a maximum price in the corresponding field to filter products by price.

## Project Structure

```
/src
├── /components              # Reusable components
│   ├── ProductList.jsx      # Main product listing component
│   └── ProductCard.jsx       # Component for rendering a single product
│
├── /styles                  # CSS files
│   ├── App.css              # Main application styles
│   └── ProductCard.css       # Styles specific to product cards
│
├── /hooks                   # Custom hooks (if needed)
│   └── useFetch.js          # Custom hook for fetching data (optional)
│
├── /utils                   # Utility functions
│   └── api.js               # API interaction functions (optional)
│
├── App.jsx                  # Main application component

```

## Technologies

- React
- JavaScript
- CSS
- API
