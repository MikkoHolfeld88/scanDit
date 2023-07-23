import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TemplateState} from "./types";
import {Template} from "../../../models/Template";

const initialTemplate: Template = {
    id: '',
    name: 'test',
    description: 'test',
    created: 'test',
    updated: 'test',
    type: 'process'

}

const initialState: TemplateState = {
    templates: [initialTemplate],
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
        editTemplateName: (state, action: PayloadAction<{ id: string, name: string }>) => {
            const template = state.templates.find(template => template.id === action.payload.id);
            if (template) {
                template.name = action.payload.name;
            }
        },
        editTemplateAuthor: (state, action: PayloadAction<{ id: string, author: string }>) => {
            const template = state.templates.find(template => template.id === action.payload.id);
            if (template) {
                template.author = action.payload.author;
            }
        }
    },
});

export const {setTemplates, addTemplate, deleteTemplate} = templateSlice.actions;

export default templateSlice.reducer;
