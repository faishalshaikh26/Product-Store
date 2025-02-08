# Product Store Frontend

This project is the frontend of the Product Store application, built with Vite, React, and Chakra UI.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the repository

```sh
cd product-store-frontend
```

### 2. Install dependencies

Using npm:

```sh
npm install
```

### 3. Start the development server

```sh
npm run dev
```

The application should now be running at `http://localhost:3000`.

## Adding Chakra UI

Chakra UI is already included in this project. If you need to add it to another project, follow these steps:

1. Install Chakra UI and its peer dependencies:

    Using npm:

    ```sh
    npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
    ```

2. Wrap your application with the `ChakraProvider` component. This is already done in the `main.jsx` file of this project:

    ```jsx
    import React from 'react'
    import { ChakraProvider } from '@chakra-ui/react'
    import ReactDOM from 'react-dom/client'
    import App from './App'

    const rootElement = document.getElementById('root')
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
         <ChakraProvider>
            <App />
         </ChakraProvider>
      </React.StrictMode>,
    )
    ```

3. setup your `vite.config.js` 
    ```jsx
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vite.dev/config/
    export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
        usePolling: true,
        },
    },
    })
    ```
## Logic of `Navbar.jsx`

The `Navbar.jsx` file defines a navigation bar component using React and Chakra UI. Here's a breakdown of the key elements:

- **Imports**:
  - Chakra UI components: `Button`, `Container`, `Flex`, `Text`, `HStack`, `useColorMode`
  - React Router: `Link`
  - React: `React`
  - Icons: `PlusSquareIcon` from Chakra UI, `IoMoon` from `react-icons/io5`, `LuSun` from `react-icons/lu`

- **Navbar Component**:
  - Uses the `useColorMode` hook from Chakra UI to handle theme toggling between light and dark modes.
  - The `Container` component sets the maximum width and padding.
  - The `Flex` component arranges the child elements in a flexible box layout, with alignment and spacing properties.
  - The `Text` component displays the title "Product Store 🛒" with styling properties such as font size, weight, text transformation, alignment, and gradient background.
  - The `HStack` component arranges the buttons horizontally with spacing.
  - The `Link` component from React Router is used to navigate to different routes (`/` for home and `/create` for creating a new product).
  - The `Button` components include:
    - A button with a `PlusSquareIcon` for navigating to the create product page.
    - A button for toggling the color mode, displaying either the `IoMoon` icon for dark mode or the `LuSun` icon for light mode.

This setup provides a responsive and styled navigation bar with theme toggling and navigation links.

## Logic of `CreatePage.jsx`

The `CreatePage.jsx` file defines a page component for creating a new product using React and Chakra UI. Here's a breakdown of the key elements:

- **Imports**:
  - Chakra UI components: `Container`, `VStack`, `Heading`, `Box`, `useToast`, `useColorModeValue`, `Input`, `Button`
  - React: `React`, `useState`
  - Zustand store: `useProductStore`

- **CreatePage Component**:
  - Uses the `useState` hook to manage the state of the new product (`name`, `price`, `image`).
  - Uses the `useProductStore` hook to access the `createProduct` function from the Zustand store.
  - Uses the `useToast` hook from Chakra UI to display toast notifications.
  - The `handleAddProduct` function:
    - Calls the `createProduct` function with the new product data.
    - Displays a success or error toast notification based on the response.
  - The `Container` component sets the maximum width.
  - The `VStack` component arranges the child elements vertically with spacing.
  - The `Heading` component displays the title "Create New Product" with styling properties.
  - The `Box` component contains the form elements with styling properties.
  - The `Input` components are used to capture the product name, price, and image URL.
  - The `Button` component triggers the `handleAddProduct` function when clicked.

This setup provides a responsive and styled page for creating new products with form validation and toast notifications.

## Logic of `HomePage.jsx`

The `HomePage.jsx` file defines the main page component for displaying the list of products using React and Chakra UI. Here's a breakdown of the key elements:

- **Imports**:
  - Chakra UI components: `Container`, `VStack`, `Text`, `SimpleGrid`
  - React Router: `Link`
  - Zustand store: `useProductStore`
  - React: `useEffect`
  - Custom component: `ProductCard`

- **HomePage Component**:
  - Uses the `useProductStore` hook to access the `fetchProducts` function and the `products` array from the Zustand store.
  - Uses the `useEffect` hook to fetch the products when the component mounts.
  - Displays the list of products using the `SimpleGrid` component, which arranges the `ProductCard` components in a responsive grid layout.
  - If no products are found, displays a message with a link to the create product page.

This setup provides a responsive and styled main page for displaying the list of products.

## Logic of `Product.js`

The `Product.js` file contains the state management logic for the products using the `zustand` library. Here's a breakdown of the key functions:

- `products`: An array that holds the list of products.
- `setProducts`: A function to update the `products` array.
- `createProduct`: An asynchronous function to create a new product. It performs the following steps:
    1. Validates the `newProduct` object to ensure all required fields (`name`, `price`, `image`) are present.
    2. Sends a POST request to the `/api/products` endpoint with the `newProduct` data.
    3. Checks the response to ensure it is successful and contains valid product data.
    4. Updates the `products` array with the newly created product if the request is successful.
- `fetchProducts`: An asynchronous function to fetch the list of products from the `/api/products` endpoint. It performs the following steps:
    1. Sends a GET request to the `/api/products` endpoint.
    2. Checks the response to ensure it is successful.
    3. Updates the `products` array with the fetched product data.
- `deleteProduct`: An asynchronous function to delete a product by its ID. It performs the following steps:
    1. Sends a DELETE request to the `/api/products/{pId}` endpoint.
    2. Checks the response to ensure it is successful.
    3. Updates the `products` array by removing the deleted product.

This setup provides state management for creating, fetching, and deleting products.

## Logic of `ProductCard.jsx`

The `ProductCard.jsx` file defines a card component for displaying individual product details using React and Chakra UI. Here's a breakdown of the key elements:

- **Imports**:
  - Chakra UI components: `Box`, `Image`, `Heading`, `Text`, `HStack`, `IconButton`, `useColorModeValue`, `useToast`
  - Zustand store: `useProductStore`
  - Chakra UI icons: `EditIcon`, `DeleteIcon`

- **ProductCard Component**:
  - Uses the `useColorModeValue` hook to set the text color and background color based on the current color mode.
  - Uses the `useProductStore` hook to access the `deleteProduct` function from the Zustand store.
  - Uses the `useToast` hook from Chakra UI to display toast notifications.
  - The `handleDeleteProduct` function:
    - Calls the `deleteProduct` function with the product ID.
    - Displays a success or error toast notification based on the response.
  - Displays the product image, name, and price using the `Image`, `Heading`, and `Text` components.
  - Provides `IconButton` components for editing and deleting the product.

This setup provides a responsive and styled card component for displaying individual product details with delete functionality and toast notifications.
