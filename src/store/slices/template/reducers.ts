import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TemplateState} from "./types";
import {Template} from "../../../models/Template";

const initialState: TemplateState = {
    templates: [],
}

export const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setTemplates: (state, action: PayloadAction<Template[]>) => {
            state.templates = action.payload;
        },
        addTemplate: (state, action: PayloadAction<Template>) => {
            state.templates.push(action.payload);
        },
        deleteTemplate: (state, action: PayloadAction<string>) => {
            state.templates = state.templates.filter(template => template.id !== action.payload);
        },

    },
});

export const {} = templateSlice.actions;

export default templateSlice.reducer;
