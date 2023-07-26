import {Template} from "../../../models/Template";

export interface TemplateState {
    templates: Template[],
    templateSearch: string | null,
}
