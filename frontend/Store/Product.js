import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields" };
        }

        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (!res.ok) {
            return { success: false, message: "Failed to create product" };
        }

        let data;
        try {
            data = await res.json(); // Ensure JSON response
        } catch (error) {
            return { success: false, message: "Invalid response from server" };
        }

        if (!data || !data.data) {
            return { success: false, message: "Invalid product data received" };
        }

        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },

    fetchProducts: async () => {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error("Failed to fetch products");

            const data = await res.json();
            set({ products: data.data || [] });
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },

    deleteProduct: async (pId) => {
        try {
            const res = await fetch(`/api/products/${pId}`, { method: "DELETE" });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            set((state) => ({
                products: state.products.filter((product) => product._id !== pId),
            }));
            return { success: true, message: "Product deleted successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    updateProduct: async (pId, updatedProduct) => {
        if (!pId || !updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return { success: false, message: "Please fill in all fields" };
        }

        try {
            const res = await fetch(`/api/products/${pId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!res.ok) {
                return { success: false, message: "Failed to update product" };
            }

            const data = await res.json();
            if (!data.success) {
                return { success: false, message: data.message };
            }

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pId ? data.data : product
                ),
            }));

            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}));
