import {AppConfigState} from "./types";
import {LIST_VIEW_STYLES} from "../../../enums/listViewStyles.enum";
import {createSlice} from "@reduxjs/toolkit";

const initialState: AppConfigState = {
    listViewStyle: LIST_VIEW_STYLES.LIST,
    configurationTab: 0
}

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        setListViewStyle: (state, action) => {
            state.listViewStyle = action.payload;
        },
        setConfigurationTab: (state, action) => {
            state.configurationTab = action.payload;
        }
    }
});

export const {setListViewStyle, setConfigurationTab} = appConfigSlice.actions;

export default appConfigSlice.reducer;
