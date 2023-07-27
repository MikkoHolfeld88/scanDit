import {Operation} from "./Operation";
import {TemplateType} from "./TemplateType";
import {Source} from "./Source";
import {Target} from "./Target";

export interface Template {
    id: string,
    name: string,
    created: string,
    type: TemplateType,
    editable: boolean,
    description?: string,
    updated?: string,
    deleted?: string,
    author?: string,
    sources?: Source[],
    targets?: Target[],
    operations?: Operation[]
}
