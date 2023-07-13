import {Operation} from "./Operation";
import {TemplateType} from "./TemplateType";

export interface Template {
    id: string,
    name: string,
    description?: string,
    created: string,
    updated?: string,
    author?: string,
    type: TemplateType,
    inputData?: any[],
    operations: Operation[]
}
