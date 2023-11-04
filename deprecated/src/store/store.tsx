import {combineReducers, configureStore} from '@reduxjs/toolkit'
import sidebarSlice from "./slices/sidebar/reducers";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    sidebar: sidebarSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
