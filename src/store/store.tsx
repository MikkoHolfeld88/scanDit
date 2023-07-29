import {combineReducers, configureStore} from '@reduxjs/toolkit'
import appConfigSlice from "./slices/appConfig/reducers";
import dataSlice from "./slices/data/reducers";
import pipelineSlice from "./slices/pipeline/reducers";
import sidebarSlice from "./slices/sidebar/reducers";
import operationSlice from "./slices/operations/reducers";
import {useDispatch} from "react-redux";
import {saveState} from "./operations/saveState";
import thunk from "redux-thunk";
import templateSlice from "./slices/template/reducers";
import firestoreMiddleware from "../firebase/firestoreMiddleware/firestoreMiddleware";

const rootReducer = combineReducers({
    appConfig: appConfigSlice,
    data: dataSlice,
    pipeline: pipelineSlice,
    template: templateSlice,
    operation: operationSlice,
    sidebar: sidebarSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    // preloadedState: loadState(),
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk, firestoreMiddleware)
});

store.subscribe(() => {
    saveState(store.getState())
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
