import {Operation} from "./Operation";
import {TemplateType} from "./TemplateType";

export interface NodeData {
    id: string,
    title: string,
    index: number,
    type: TemplateType,
    description?: string,
    operations: Operation[]
}
