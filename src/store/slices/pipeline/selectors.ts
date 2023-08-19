import {RootState} from "../../store";

export const selectPipelines = (state: RootState) => state.pipeline.pipelines;
export const selectPipelineById = (state: RootState, pipelineId: string) => state.pipeline.pipelines.find(pipeline => pipeline.id === pipelineId);
export const selectPipelinesStatus = (state: RootState) => state.pipeline.status;
export const selectLatestCreatedPipeline = (state: RootState) => {
    const pipelinesCopy = [...state.pipeline.pipelines];
    return pipelinesCopy.sort((a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )[0];
}
export const selectDirection = (state: RootState) => state.pipeline.pipelineBuilder.direction;
