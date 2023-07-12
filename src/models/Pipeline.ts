import {Template} from "./Template";

export interface Pipeline {
    id: string,
    name: string,
    description?: string,
    created: string,
    updated?: string,
    author?: string,
    templates: Template[]
}
