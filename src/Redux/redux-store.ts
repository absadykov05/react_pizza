import {configureStore} from '@reduxjs/toolkit'
import homeReducer from "./homeReducer";
import cartReducer from "./cartReducer";
import axiosReducer from "./axiosReducer";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        home: homeReducer,
        cart: cartReducer,
        pizzas: axiosReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export const UseAppDispatch: () => typeof store.dispatch = useDispatch;

export default store;

//store = store.window();
