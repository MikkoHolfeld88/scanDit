import {RootState} from "../../store";

export const selectNodes = (state: RootState) => state.pipeline.nodes;

export const selectNodeIds = (state: RootState) => state.pipeline.nodes.map(node => node.id);

export const selectLastNodeId = (state: RootState) => {
    const nodeIds = selectNodeIds(state);
    return nodeIds[nodeIds.length - 1];
};

export const selectEdges = (state: RootState) => state.pipeline.edges;

export const selectPipelines = (state: RootState) => state.pipeline.pipelines;
export const selectPipelineById = (state: RootState, pipelineId: string) => state.pipeline.pipelines.find(pipeline => pipeline.id === pipelineId);
