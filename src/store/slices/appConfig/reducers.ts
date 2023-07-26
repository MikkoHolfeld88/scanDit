import {AppConfigState} from "./types";
import {LIST_VIEW_STYLES} from "../../../enums/listViewStyles.enum";
import {createSlice} from "@reduxjs/toolkit";
import {APP_MODE} from "../../../enums/appMode.enum";
import {TEMPLATE_SORTING} from "../../../enums/teplateSorting.enum";

const initialState: AppConfigState = {
    listViewStyle: LIST_VIEW_STYLES.LIST,
    configurationTab: 0,
    templateSorting: TEMPLATE_SORTING.ALPHABETICALLY,
    mode: APP_MODE.DEFAULT
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
        },
        setTemplateSorting: (state, action) => {
            state.templateSorting = action.payload;
        },
        setAppMode: (state, action) => {
            state.mode = action.payload;
        },
        resetAppMode: (state) => {
            state.mode = APP_MODE.DEFAULT;
        }
    }
});

export const {setListViewStyle, setConfigurationTab, setTemplateSorting, setAppMode, resetAppMode} = appConfigSlice.actions;

export default appConfigSlice.reducer;
