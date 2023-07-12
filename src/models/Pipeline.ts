import {Template} from "./Template";
import {Operation} from "./Operation";
import {OperationType} from "./OperationType";
import {Operator} from "./Operator";

export interface Pipeline {
    id: string,
    name: string,
    description?: string,
    created: string,
    updated?: string,
    author?: string,
    templates: Template[]
    input?: any[],
    output?: any[]
}

