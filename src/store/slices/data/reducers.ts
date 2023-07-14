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
        setData: (state, action) => {
            state.files = action.payload;
            state.isUploading = false;
        },
        setIsUploading: (state, action) => {
            state.isUploading = action.payload;
        },
        setSelectedFiles : (state, action) => {
            state.selectedFiles = action.payload;
        },
        addSelectedFile: (state, action) => {
            if (state.selectedFiles) {
                state.selectedFiles.push(action.payload);
            }
        },
        removeSelectedFile: (state, action) => {
            if (state.selectedFiles) {
                state.selectedFiles = state.selectedFiles.filter(file => file.id !== action.payload);
            }
        }
    }
});

export const {setData, setIsUploading, setSelectedFiles, addSelectedFile, removeSelectedFile} = dataSlice.actions;

export default dataSlice.reducer;
