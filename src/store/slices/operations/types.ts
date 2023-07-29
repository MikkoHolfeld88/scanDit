import {FetchingStatus} from "../../../models/FetchingStatus";
import {Operation} from "../../../models/Operation";

export interface OperationState {
    operations: Operation[];
    status: FetchingStatus;
    error: string | undefined;
}
