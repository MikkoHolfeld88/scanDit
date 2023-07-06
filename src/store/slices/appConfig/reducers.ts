import {AppConfigState} from "./types";
import {LIST_VIEW_STYLES} from "../../../enums/listViewStyles.enum";
import {createSlice} from "@reduxjs/toolkit";

const initialState: AppConfigState = {
    listViewStyle: LIST_VIEW_STYLES.LIST,
}

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        setListViewStyle: (state, action) => {
            state.listViewStyle = action.payload;
        }
    }
});

export const {setListViewStyle} = appConfigSlice.actions;

export default appConfigSlice.reducer;
