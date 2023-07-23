import {DIRECTIONS} from "../enums/directions.enum";

export interface TemplateRelation {
    id: string,
    parentId: string,
    childId: string,
    direction: DIRECTIONS
}
