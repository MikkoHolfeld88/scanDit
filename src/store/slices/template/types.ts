import {Template} from "../../../models/Template";
import {FetchingStatus} from "../../../models/FetchingStatus";

export interface TemplateState {
    templates: Template[];
    templateSearch: string | null;
    status: FetchingStatus;
    error: string | undefined;
}
