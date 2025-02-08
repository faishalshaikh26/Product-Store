import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Create a new product
router.post('/', createProduct);

// Update an existing product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

export default router;
