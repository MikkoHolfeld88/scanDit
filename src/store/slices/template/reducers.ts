import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TemplateState} from "./types";
import {Template} from "../../../models/Template";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {fetchTemplates} from "./thunks";
import {Operation} from "../../../models/Operation";

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
                if (action.payload.name !== undefined) {
                    template.name = action.payload.name;
                }
                if (action.payload.type !== undefined) {
                    template.type = action.payload.type;
                }
                if (action.payload.description !== undefined) {
                    template.description = action.payload.description;
                }
                if (action.payload.editable !== undefined) {
                    template.editable = action.payload.editable;
                }
                if (action.payload.operations !== undefined) {
                    template.operations = action.payload.operations;
                }
                if (action.payload.sources !== undefined) {
                    template.sources = action.payload.sources;
                }
                if (action.payload.targets !== undefined) {
                    template.targets = action.payload.targets;
                }
                if (action.payload.deleted !== undefined) {
                    template.deleted = action.payload.deleted;
                }
                if (action.payload.author !== undefined) {
                    template.author = action.payload.author;
                }
                template.updated = new Date().toISOString();
            }
        },
        saveTemplateOperations: (state, action: PayloadAction<{ id: string, operations: Operation[] }>) => {
            const template = state.templates.find(template => template.id === action.payload.id);
            if (template) {
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

export const {setTemplates, addTemplate, editTemplate, saveTemplateOperations, deleteTemplate, setTemplateSearch} = templateSlice.actions;

export default templateSlice.reducer;
