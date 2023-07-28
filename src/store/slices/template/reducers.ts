import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TemplateState} from "./types";
import {Template} from "../../../models/Template";
import {TEMPLATE_TYPE} from "../../../enums/templateType.enum";
import {fetchPipelines} from "../pipeline/thunks";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {fetchTemplates} from "./thunks";

const initialTemplate: Template = {
    id: '',
    name: 'test',
    description: 'test',
    created: new Date().toISOString(),
    type: TEMPLATE_TYPE.INPUT,
    editable: false
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1); // gestern

const testTemplate: Template = {
    id: '',
    name: 'search',
    description: 'test',
    created: yesterday.toISOString(),
    updated: yesterday.toISOString(),
    type: TEMPLATE_TYPE.PROCESS,
    editable: false
}

const initialState: TemplateState = {
    templates: [],
    templateSearch: null,
    status: FETCHING_STATE.IDLE,
    error: undefined
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
        editTemplate: (state, action: PayloadAction<Template>) => {
            const template = state.templates.find(template => template.id === action.payload.id);
            if (template) {
                template.name = action.payload.name;
                template.description = action.payload.description;
                template.updated = new Date().toISOString();
                template.type = action.payload.type;
                template.editable = action.payload.editable;
                template.author = action.payload.author;
                template.sources = action.payload.sources;
                template.targets = action.payload.targets;
                template.operations = action.payload.operations;
            }
        },
        deleteTemplate: (state, action: PayloadAction<string>) => {
            state.templates = state.templates.filter(template => template.id !== action.payload);
        },
        setTemplateSearch: (state, action: PayloadAction<string | null>) => {
            state.templateSearch = action.payload;
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
    extraReducers: (builder) => {
        builder.addCase(fetchTemplates.pending, (state) => {
            state.status = FETCHING_STATE.LOADING;
        });
        builder.addCase(fetchTemplates.fulfilled, (state, action) => {
            state.status = FETCHING_STATE.SUCCEEDED;
            state.templates = action.payload;
        });
        builder.addCase(fetchTemplates.rejected, (state, action) => {
            state.status = FETCHING_STATE.FAILED;
            state.error = action.error.message;
        });
    }
});

export const {setTemplates, addTemplate, deleteTemplate, setTemplateSearch} = templateSlice.actions;

export default templateSlice.reducer;
