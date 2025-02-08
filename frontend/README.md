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

