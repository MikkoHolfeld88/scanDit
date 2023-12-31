import {TEMPLATE_SORTING} from "../enums/templateSorting.enum";

export type TemplateSortingType =
    TEMPLATE_SORTING.ALPHABETICALLY
    | TEMPLATE_SORTING.BY_DATE
    | TEMPLATE_SORTING.BY_TYPE
    | TEMPLATE_SORTING.ALPHABETICALLY_REVERSE
    | TEMPLATE_SORTING.BY_DATE_REVERSE
    | TEMPLATE_SORTING.BY_TYPE_REVERSE;
