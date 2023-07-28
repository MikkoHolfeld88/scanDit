import {DataState} from "./types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: DataState = {
    isUploading: false,
    files: null,
    selectedFiles: null,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
            state.isUploading = false;
        },
        setIsUploading: (state, action) => {
            state.isUploading = action.payload;
        }
    }
});

export const {setFiles, setIsUploading } = dataSlice.actions;

export default dataSlice.reducer;
