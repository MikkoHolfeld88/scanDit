import {configureStore} from '@reduxjs/toolkit'
import appConfigSlice from "./slices/appConfig/reducers";
import dataSlice from "./slices/data/reducers";
import pipelineSlice from "./slices/pipeline/reducers";
import sidebarSlice from "./slices/sidebar/reducers";
import {useDispatch} from "react-redux";
import {loadState} from "./operations/loadState";
import {saveState} from "./operations/saveState";
import thunk from "redux-thunk";

export const store = configureStore({
    // preloadedState: loadState(),
    reducer: {
        appConfig: appConfigSlice,
        data: dataSlice,
        pipeline: pipelineSlice,
        sidebar: sidebarSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

store.subscribe(() => {
    saveState(store.getState())
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
