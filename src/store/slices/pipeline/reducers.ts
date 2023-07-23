import {PipelineState} from "./types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: PipelineState = {
    pipelines: [],
}

export const pipelineSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {
        setPipelines: (state, action) => {
            state.pipelines = action.payload;
        },
        addPipeline: (state, action) => {
            state.pipelines.push(action.payload);
        },
        editPipelineName: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.name = action.payload.name;
            }
        },
        editPipelineAuthor: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.author = action.payload.author;
            }
        },
        editPipelineDescription: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.description = action.payload.description;
            }
        },
        editPipelineIcon: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.icon = action.payload.icon;
            }
        },
        deletePipeline: (state, action) => {
            state.pipelines = state.pipelines.filter(pipeline => pipeline.id !== action.payload);
        }
    }
});

export const {
    addPipeline,
    deletePipeline
} = pipelineSlice.actions;

export default pipelineSlice.reducer;
