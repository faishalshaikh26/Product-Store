import {create} from 'zustand'

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
    }
}));
