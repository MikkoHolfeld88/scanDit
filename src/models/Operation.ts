import {OperationType} from "./operationTypes/OperationType";

export interface Operation {
    id: string,
    name: string,
    type: OperationType,
    prompt?: string,
    icon?: any,
    description?: string,
    created: string,
    updated?: string,
    deleted?: string,
    author?: string,
    result?: any
}
