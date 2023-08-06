import {TemplateSortingType} from "../models/TemplateSortingType";
import {Template} from "../models/Template";
import {TEMPLATE_SORTING} from "../enums/templateSorting.enum";

export const getSortFunction = (templateSorting: TemplateSortingType) => {
    switch (templateSorting) {
        case TEMPLATE_SORTING.ALPHABETICALLY:
            return sortAlphabetically;
        case TEMPLATE_SORTING.ALPHABETICALLY_REVERSE:
            return (a: Template, b: Template) => sortAlphabetically(b, a);
        case TEMPLATE_SORTING.BY_DATE:
            return sortByDate;
        case TEMPLATE_SORTING.BY_DATE_REVERSE:
            return (a: Template, b: Template) => sortByDate(b, a);
        case TEMPLATE_SORTING.BY_TYPE:
            return sortByType;
        case TEMPLATE_SORTING.BY_TYPE_REVERSE:
            return (a: Template, b: Template) => sortByType(b, a);
        default:
            return sortAlphabetically;
    }
}

/**
 * Sorts the templates alphabetically by name.
 *
 * @param a - The first template
 * @param b - The second template
 * @return The order of the templates
 */
const sortAlphabetically = (a: Template, b: Template) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

/**
 * Sorts the templates by date (updated if available, otherwise created).
 *
 * @param a - The first template
 * @param b - The second template
 * @return The order of the templates
 */
const sortByDate = (a: Template, b: Template) => {
    const dateA = new Date(a.updated || a.created);
    const dateB = new Date(b.updated || b.created);
    return dateB.getTime() - dateA.getTime(); // descending order
};

/**
 * Sorts the templates by type (input, output, process).
 *
 * @param a - The first template
 * @param b - The second template
 * @return The order of the templates
 */
export const sortByType = (a: Template, b: Template) => {
    if (!a || !b) return 0;

    if (!a.type || !b.type) return 0;

    if (a.type < b.type) {
        return -1;
    }
    if (a.type > b.type) {
        return 1;
    }
    return 0;
};
