import {AppMode} from "../../../models/AppMode";
import {ListViewStylesType} from "../../../models/ListViewStylesType";
import {TemplateSortingType} from "../../../models/TemplateSortingType";

export interface AppConfigState {
    listViewStyle: ListViewStylesType;
    configurationTab: number;
    templateSorting: TemplateSortingType;
    mode: AppMode;
}
