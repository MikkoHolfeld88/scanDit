import {RootState} from "../../store";

export const selectFlow = (state: RootState) => state.operations.flow;
export const selectNodes = (state: RootState) => state.operations.flow.nodes;
export const selectEdges = (state: RootState) => state.operations.flow.edges;
