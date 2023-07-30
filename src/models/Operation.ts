import {OperationType} from "./OperationType";
import {Operator} from "./Operator";

export interface Operation {
    id: string,
    name: string,
    type: OperationType,
    operator: Operator
    description?: string,
    created: string,
    updated?: string,
    deleted?: string,
    author?: string,
}
