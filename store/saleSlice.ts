import { createSlice,configureStore, createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import {CartItem} from '../interfaces/cartItem'
import {Product} from '../interfaces/product'


/**
 * declaration of the sale slice
 * 
 * 
 */
export const saleSlice = createSlice({
    name:'sale',
    initialState: {
        cart: Array<CartItem>(),
        products: Array<Product>()
    },
    reducers: {
        /**
         * lets you add an object to the cart array
         * 
         * @param action.payload object to be added
         * 
         * usage 
         * 
         * dispatch({type: 'sale/addItemToCart',payload: item})
         */
        addItemToCart: (state,action: PayloadAction<CartItem>) => {
            state.cart = state.cart.concat(action.payload)
        },
        resetCart: (state) => {
            state.cart = []
        },
        /**
         * lets you add an object to the product cache array
         * 
         * @param action.payload objects to be added
         * 
         * usage 
         * 
         * dispatch({type: 'sale/addProductsCache',payload: item})
         */
        addProductsCache: (state,action: PayloadAction<[]>) =>{
            state.products = [...action.payload]
        }
    }
})

export const store = configureStore({
    reducer: {
        sale: saleSlice.reducer
    }
})

