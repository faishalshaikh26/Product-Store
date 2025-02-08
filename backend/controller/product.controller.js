import Product from "../model/product.model.js";
// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from DB
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};


// Create a new product
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product successfully created', data: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};


// Update an existing product
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, price: req.body.price, image: req.body.image },
            { new: true } // Return updated product
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product successfully updated', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};


// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
