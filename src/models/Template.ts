import {Operation} from "./Operation";

export interface Template {
    id: string,
    name: string,
    description?: string,
    created: string,
    updated?: string,
    author?: string,
    operations: Operation[]
}
