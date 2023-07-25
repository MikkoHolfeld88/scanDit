
import {Pipeline} from "../../../models/Pipeline";
import {FetchingStatus} from "../../../models/FetchingStatus";

export interface PipelineState {
    status: FetchingStatus;
    pipelines: Pipeline[]
    error: string | undefined;
}

