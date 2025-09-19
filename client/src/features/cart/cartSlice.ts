import { createSlice } from "@reduxjs/toolkit";

type CartState = {
    items: Array<{
        userId: string
        productId: string,
        productImage: string,
        productName: string,
        productPrice: number,
        productQuantity: number,
    }>;
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        // add to cart
        addToCart: (state, action) => {
            const items = Array.isArray(action.payload) ? action.payload : [action.payload];
            items.forEach(item => {
                const exists = state.items.some(i => i.productId === item.productId);
                if (!exists) {
                    state.items.push({ ...item });
                }
            });
        },
        // remove from cart
        removeFromCart: (state) => {
            state.items = []
        },
        // update quantity
        increaseQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            console.log(id, quantity);

            const existingItem = state.items.find(i => i.productId === id);
            if (existingItem) {
                existingItem.productQuantity += quantity;
            }
        },
        decreaseQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(i => i.productId === id);
            if (existingItem) {
                existingItem.productQuantity -= quantity;
            }
        }

    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;