import {configureStore} from '@reduxjs/toolkit'
import appConfigSlice from "./slices/appConfig/reducers";
import dataSlice from "./slices/data/reducers";
import pipelineSlice from "./slices/pipeline/reducers";
import sidebarSlice from "./slices/sidebar/reducers";
import {useDispatch} from "react-redux";
import {loadState} from "./operations/loadState";
import {saveState} from "./operations/saveState";
import thunk from "redux-thunk";
import templateSlice from "./slices/template/reducers";

export const store = configureStore({
    // preloadedState: loadState(),
    reducer: {
        appConfig: appConfigSlice,
        data: dataSlice,
        pipeline: pipelineSlice,
        template: templateSlice,
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
