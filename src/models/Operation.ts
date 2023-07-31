import {OperationType} from "./operationTypes/OperationType";
import {Operator} from "./Operator";

export interface Operation {
    id: string,
    name: string,
    type: OperationType,
    operator: Operator | null,
    icon?: any,
    description?: string,
    created: string,
    updated?: string,
    deleted?: string,
    author?: string,
}
