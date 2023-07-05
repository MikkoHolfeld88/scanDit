import {configureStore} from '@reduxjs/toolkit'
import sidebarSlice from "./slices/sidebar/reducers";
import appConfigSlice from "./slices/appConfig/reducers";
import {useDispatch} from "react-redux";
import {loadState} from "./operations/loadState";
import {saveState} from "./operations/saveState";
import dataSlice from "./slices/data/reducers";

export const store = configureStore({
    preloadedState: loadState(),
    reducer: {
        appConfig: appConfigSlice,
        data: dataSlice,
        sidebar: sidebarSlice,
    },
})

store.subscribe(() => {
    saveState(store.getState())
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
