import {PipelineState} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchPipelines} from "./thunks";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {TemplateRelation} from "../../../models/TemplateRelation";
import {DIRECTIONS} from "../../../enums/directions.enum";

const initialState: PipelineState = {
    status: FETCHING_STATE.IDLE,
    error: undefined,
    pipelines: [],
    pipelineBuilder: {
        direction: DIRECTIONS.DOWN
    }
}

export const pipelineSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {
        setPipelines: (state, action) => {
            state.pipelines = action.payload;
        },
        editPipeline: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.name = action.payload.name ? action.payload.name : pipeline.name;
                pipeline.description = action.payload.description ? action.payload.description : pipeline.description
                pipeline.updated = new Date().toISOString();
                pipeline.author = action.payload.author ? action.payload.author : pipeline.author;
                pipeline.icon = action.payload.icon ? action.payload.icon : pipeline.icon;
                pipeline.templates = action.payload.templates ? action.payload.templates : pipeline.templates;
            }
        },
        addPipeline: (state, action) => {
            state.pipelines.push(action.payload);
        },
        deletePipeline: (state, action) => {
            state.pipelines = state.pipelines.filter(pipeline => pipeline.id !== action.payload);
        },
        addTemplateToPipeline: (state, action: { payload: { pipelineId: string, templateRelation: TemplateRelation } }) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                pipeline.templates.push(action.payload.templateRelation);
            }
        },
        setDirection: (state, action) => {
            state.pipelineBuilder.direction = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPipelines.pending, (state) => {
            state.status = FETCHING_STATE.LOADING;
        });
        builder.addCase(fetchPipelines.fulfilled, (state, action) => {
            state.status = FETCHING_STATE.SUCCEEDED;
            state.pipelines = action.payload;
        });
        builder.addCase(fetchPipelines.rejected, (state, action) => {
            state.status = FETCHING_STATE.FAILED;
            state.error = action.error.message;
        });
    }
});

export const {
    addPipeline,
    editPipeline,
    deletePipeline,
    setDirection
} = pipelineSlice.actions;

export default pipelineSlice.reducer;
