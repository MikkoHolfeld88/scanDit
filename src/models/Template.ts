import {Operation} from "./Operation";
import {TemplateType} from "./TemplateType";
import {Source} from "./Source";
import {Target} from "./Target";

export interface Template {
    id: string,
    name: string,
    description?: string,
    created: string,
    updated?: string,
    deleted?: string,
    author?: string,
    type: TemplateType,
    sources?: Source[],
    targets?: Target[],
    operations?: Operation[]
}
