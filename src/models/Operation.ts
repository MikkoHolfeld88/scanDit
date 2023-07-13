import {OperationType} from "./OperationType";
import {Operator} from "./Operator";

export interface Operation {
    id: string,
    type: OperationType,
    description?: string,
    created: string,
    updated?: string,
    author?: string,
    operator: Operator
}
