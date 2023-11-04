import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OperationsState} from "./types";
import {applyEdgeChanges, applyNodeChanges, Node, Edge, EdgeChange, NodeChange} from "reactflow";

const initialState: OperationsState = {
    flow: {
        nodes: [
            {
                id: 'root',
                type: 'operation',
                data: { label: 'Operation Init'},
                position: { x: 0, y: 0 },
            }
        ],
        edges: [],
    }
}

export const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        setNodes: (state, action: PayloadAction<Node[]>) => {
            state.flow.nodes = action.payload as Node[];
        },
        setEdges: (state, action: PayloadAction<Edge[]>) => {
            state.flow.edges = action.payload;
        },
        applyNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
            state.flow.nodes = applyNodeChanges(action.payload, state.flow.nodes);
        },
        applyEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
            state.flow.edges = applyEdgeChanges(action.payload, state.flow.edges);
        },
    },
});

export const {setNodes, setEdges, applyNodesChange, applyEdgesChange} = operationsSlice.actions;

export default operationsSlice.reducer;
