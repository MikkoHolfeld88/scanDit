import {Operation} from "./Operation";
import {TemplateType} from "./TemplateType";
import {Source} from "./Source";

export interface NodeData {
    id: string,
    title: string,
    index: number,
    type: TemplateType,
    description?: string,
    operations?: Operation[],
    sources?: Source[]
}
