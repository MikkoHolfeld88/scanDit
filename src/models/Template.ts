import {Operation} from "./Operation";
import {TemplateType} from "./TemplateType";
import {Source} from "./Source";
import {Target} from "./Target";

/**
 * Template model
 * @interface Template
 * @property {string} id - Template id
 * @property {string} name - Template name
 * @property {TemplateType} type - Template type , type defines the template's purpose
 *           and the type of attribute it contains, an "input" TemplateType for example
 *           must have the properties sources set
*  @property {string} created - Template creation date
 * @property {boolean} editable - Template editable flag (user created or given template)
 * @property {Operation[]} operations - Template operations
 * @property {Source[]} sources - Template sources
 * @property {Target[]} targets - Template targets
 * @property {string} description - Template description
 * @property {string} updated - Template last update date
 * @property {string} deleted - Template deletion date (soft delete)
 * @property {string} author - Template author
 */
export interface Template {
    id: string,
    name: string,
    type: TemplateType,
    created: string,
    editable: boolean,
    operations?: Operation[]
    sources?: Source[],
    targets?: Target[],
    description?: string,
    updated?: string,
    deleted?: string,
    author?: string,
}
