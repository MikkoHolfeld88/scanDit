import {TemplateSortingType} from "../models/TemplateSortingType";
import {Template} from "../models/Template";
import {TEMPLATE_SORTING} from "../enums/teplateSorting.enum";

export const getSortFunction = (tempateSorting: TemplateSortingType) => {
    const defaultSorting = sortAlphabetically;

    switch (tempateSorting) {
        case TEMPLATE_SORTING.ALPHABETICALLY:
            return sortAlphabetically;
        case TEMPLATE_SORTING.BY_DATE:
            return sortByDate;
        case TEMPLATE_SORTING.BY_TYPE:
            return sortByType;
        default:
            return defaultSorting;
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
const sortByType = (a: Template, b: Template) => {
    if (a.type < b.type) {
        return -1;
    }
    if (a.type > b.type) {
        return 1;
    }
    return 0;
};
