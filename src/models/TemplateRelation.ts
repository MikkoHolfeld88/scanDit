import {DIRECTIONS} from "../enums/directions.enum";

export interface TemplateRelation {
    id: string,
    parentIds: string[],
    childIds: string[],
    directions: DIRECTIONS[] | null
}
