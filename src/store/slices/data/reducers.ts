import {DataState} from "./types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: DataState = {
    isUploading: false,
    files: null,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.files = action.payload;
            state.isUploading = false;
        },
        setIsUploading: (state, action) => {
            state.isUploading = action.payload;
        }
    }
});

export const {setData, setIsUploading} = dataSlice.actions;

export default dataSlice.reducer;
