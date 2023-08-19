
import {Pipeline} from "../../../models/Pipeline";
import {FetchingStatus} from "../../../models/FetchingStatus";
import {DIRECTIONS} from "../../../enums/directions.enum";

export interface PipelineState {
    status: FetchingStatus;
    pipelines: Pipeline[];
    error: string | undefined;
    pipelineBuilder: {
        direction: DIRECTIONS
    };
}

