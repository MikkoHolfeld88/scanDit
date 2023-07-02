import {configureStore} from '@reduxjs/toolkit'
import sidebarSlice from "./slices/sidebar/reducer";
import {useDispatch} from "react-redux";
import {loadState} from "./operations/loadState";
import {saveState} from "./operations/saveState";

export const store = configureStore({
    preloadedState: loadState(),
    reducer: {
        sidebar: sidebarSlice,
    },
})

store.subscribe(() => {
    saveState(store.getState())
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
