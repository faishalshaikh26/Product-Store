# Product Store Backend

This is the backend for the Product Store project. Follow the instructions below to set up the project and create the server.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
    ```sh
    cd Product store
    ```

2. Install dependencies:
    ```sh
    npm init -y
    npm install express mongoose dotenv
    npm nodemon -D
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=<port-number>
   MONGO_URI= <database-string>
    ```
## Scripts

- `"dev": "nodemon backend/server.js"` .

## Running the Server

1. Start the development server:
    ```sh
    npm run dev
    ```

    ## Project Structure

    The project structure is as follows:

    ```
    backend/
    │
    ├── models/
    │   └── product.model.js
    ├── routes/
    │   └── product.route.js
    ├── controllers/
    │   └── product.controller.js
    ├── config/
    │   └── db.js
    ├── server.js
    └── .env
    ```

    ## Explanation of Files

    ### `server.js`

    This is the entry point of the application. It sets up the Express server and connects to the MongoDB database.

    ```js
    const express = require('express');
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const productRoutes = require('./routes/product.route');

    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(express.json());
    app.use('/api/products', productRoutes);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    ```

    ### `models/product.model.js`

    This file defines the schema for the Product model using Mongoose.

    ```js
    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
    }, {
        timestamps: true,
    });

    module.exports = mongoose.model('Product', productSchema);
    ```

    ### `routes/product.route.js`

    This file defines the routes for product-related operations.

    ```js
    const express = require('express');
    const router = express.Router();
    const productController = require('../controllers/product.controller');

    router.get('/', productController.getAllProducts);
    router.post('/', productController.createProduct);
    router.get('/:id', productController.getProductById);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', productController.deleteProduct);

    module.exports = router;
    ```

    ### `controllers/product.controller.js`

    This file contains the logic for handling product-related requests.

    ```js
    const Product = require('../models/product.model');

    exports.getAllProducts = async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    exports.createProduct = async (req, res) => {
        const product = new Product(req.body);
        try {
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

    exports.getProductById = async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    exports.updateProduct = async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

    exports.deleteProduct = async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    ```

    ### `config/db.js`

    This file contains the configuration for connecting to the MongoDB database.

    ```js
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');

    dotenv.config();

    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected');
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    };

    module.exports = connectDB;
    ```

    