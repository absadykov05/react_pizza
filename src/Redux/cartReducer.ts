import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./redux-store";


export type CartItemType = {
    id: number;
    title: string;
    price: number;
    src: string;
    count: number;
    type: string;
    sizes: number;
}

type CartReducerType = {
    cartItems: CartItemType[];
    totalPrice: number;
}

const initialState: CartReducerType = {
    cartItems: [],
    totalPrice: 0,
}

export const CartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const obj = state.cartItems.find(obj => obj.id == action.payload.id);
            if (obj) {
                obj.count++;
                state.totalPrice += action.payload.price;
            } else {
                state.cartItems.push(action.payload);
                state.totalPrice += action.payload.price;
            }
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            let obj = state.cartItems[action.payload];
            state.totalPrice -= obj.price * obj.count;
            state.cartItems.splice(action.payload, 1);
        },
        clearItem: (state) => {
            if (window.confirm('Вы хотите очистить корзину?')) {
                state.cartItems = [];
            }
        },

        plusPizzaCount: (state, action) => {
            let obj = state.cartItems[action.payload];
            obj.count += 1;
            state.totalPrice += obj.price;
        },
        minusPizzaCount: (state, action) => {
            let obj = state.cartItems[action.payload];
            if (obj.count > 1) {
                obj.count -= 1;
                state.totalPrice -= obj.price;
            }
        },
    },
})

export const cartSelector = (state: RootState) => state.cart;
export const cartItemCountSelector = (id: number) => (state: RootState) => state.cart.cartItems.find(obj => Number(obj.id) === id);

// Action creators are generated for each case reducer function
export const {addItem, deleteItem, clearItem, plusPizzaCount, minusPizzaCount,} = CartReducer.actions

export default CartReducer.reducer
