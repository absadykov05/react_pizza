import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "./redux-store";

type PizzaParamsType = { category: number, pagination: number, sortName: string, lastSearch: string };
export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchByIdStatus',
    async (params: PizzaParamsType) => {
        const {category, pagination, sortName, lastSearch} = params;
        const response = await axios.get(`https://62baca097bdbe01d528ff2cb.mockapi.io/pizzas?${category > 0 ? `category=${category}` : ''}&page=${pagination}&limit=4&sortBy=${sortName}&search=${lastSearch}`)
        return response.data as ItemType[];
    }
)

export type ItemType = {
    id: string;
    name: string;
    price: number;
    img: string;
    count: number;
    types: number[];
    sizes: number[];
}

type AxiosReducerType = {
    items: ItemType[];
    status: 'loading' | 'success' | 'error';
}

const initialState: AxiosReducerType = {
    items: [],
    status: 'loading' // loading | success | error
}

export const axiosReducer = createSlice({
        name: 'pizzas',
        initialState,
        reducers: {
            setPizzas: (state, action: PayloadAction<ItemType[]>) => {
                state.items = action.payload;
            },
            setStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
                state.status = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchPizzas.pending, (state) => {
                    state.items = [];
                })
                .addCase(fetchPizzas.fulfilled, (state, action) => {
                    state.items = action.payload;
                    state.status = 'success';
                })
                .addCase(fetchPizzas.rejected, (state, action) => {
                    state.items = [];
                    state.status = 'error';
                })

                .addDefaultCase((state, action) => {
                })

        },
    }
)

export const axiosSelector = (state: RootState) => state.pizzas;

// Action creators are generated for each case reducer function
export const {setPizzas, setStatus} = axiosReducer.actions

export default axiosReducer.reducer
