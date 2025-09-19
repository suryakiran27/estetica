import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice';
import authDetails from './authSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        cartSlice: cartReducer,
        authDetails: authDetails
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


