import {PipelineState} from "./types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: PipelineState = {
    nodes: [],
    edges: [],
}

export const pipelineSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {
        setNodes: (state, action) => {
            state.nodes = action.payload;
        },
        setEdges: (state, action) => {
            state.edges = action.payload;
        },
        updateNodeDimensions: (state, action) => {
            const node = state.nodes.find(node => node.id === action.payload.nodeId);

            if (node) {
                node.width = action.payload.width;
                node.height = action.payload.height;
            }
        },
        centerNodesHorizontally: (state) => {
            const maxWidth = state.nodes.reduce((maxWidth, node) => Math.max(maxWidth, node.width || 0), 0);
            state.nodes.forEach(node => {
                node.position.x = (maxWidth - (node.width || 0)) / 2;
            });
        },
        centerNodesVertically: (state) => {
            const margin: number = 50;
            state.nodes.forEach((node, index) => {
                const heightBefore: number = state.nodes.slice(0, index).reduce((acc, node) => acc + (node.height || 0), 0);
                node.position.y = heightBefore + margin * index;
            });
        },
    }
});

export const {setNodes, setEdges, updateNodeDimensions, centerNodesHorizontally, centerNodesVertically} = pipelineSlice.actions;

export default pipelineSlice.reducer;
