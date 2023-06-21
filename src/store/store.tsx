import {configureStore, createReducer} from '@reduxjs/toolkit'
import sideBarSlice from "./slices/sidebar";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        sidebar: sideBarSlice,
    },
})

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
