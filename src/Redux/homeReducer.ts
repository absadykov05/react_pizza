import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./redux-store";

type HomeReducerType = {
    category: number;
    sort: string;
    searchText: string;
    lastSearch: string;
    pagination: number;
}

const initialState: HomeReducerType = {
    category: 0,
    sort: 'rating&order=desc',
    searchText: '',
    lastSearch: '',
    pagination: 1,
}

export const HomeReducer = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
            state.pagination = 1;
        },
        setSortIndex: (state, action) => {
            state.sort = action.payload;
            state.pagination = 1;
        },
        onSearchTextChange: (state, action) => {
            state.searchText = action.payload;
        },
        realSearch: (state, action) => {
            state.lastSearch = action.payload;
            state.pagination = 1;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload.selected + 1;
        },
        setFilters: (state, action) => {
            state.category = Number(action.payload.category);
            state.pagination = Number(action.payload.pagination);
            if (action.payload.sort) {
                state.sort = action.payload.sort
            } else {
                state.sort = 'rating&order=desc';
            }
        },
    },
})

export const homeSelector = (state: RootState) => state.home;

// Action creators are generated for each case reducer function
export const {
    setCategory,
    setSortIndex,
    onSearchTextChange,
    realSearch,
    setPagination,
    setFilters,
} = HomeReducer.actions

export default HomeReducer.reducer
/*
import React from 'react';

let initialState = {
    category: 0,
    sort: 0,
    search: '',
}

const HomeReducer = (state = initialState, action) => {
    debugger
    if (action.type == 'SET-CATEGORY') {
        state.category = action.category;
        return state;
    } else {
        return state;
    }
};

export default HomeReducer;
*/
