import {DataState} from "./types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFirestore} from "firebase/firestore";

const initialState: DataState = {
    isLoading: false,
    data: null,
}


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const {setData} = dataSlice.actions;

export default dataSlice.reducer;
