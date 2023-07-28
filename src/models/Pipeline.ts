import {TemplateRelation} from "./TemplateRelation";

export interface Pipeline {
    id: string,
    name: string,
    description?: string,
    created: string,
    updated?: string,
    author?: string,
    icon?: any,
    templates: TemplateRelation[],
    userId?: string
}

