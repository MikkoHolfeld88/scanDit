import {RootState} from "../../store";

export const selectPipelines = (state: RootState) => state.pipeline.pipelines;
export const selectPipelineById = (state: RootState, pipelineId: string) => state.pipeline.pipelines.find(pipeline => pipeline.id === pipelineId);
