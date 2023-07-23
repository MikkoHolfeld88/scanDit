import {LIST_VIEW_STYLES} from "../../../enums/listViewStyles.enum";
import {AppMode} from "../../../models/AppMode";

export type ListViewStylesType = LIST_VIEW_STYLES.LIST | LIST_VIEW_STYLES.FREE | LIST_VIEW_STYLES.TABLE;

export interface AppConfigState {
    listViewStyle: ListViewStylesType;
    configurationTab: number;
    mode: AppMode;
}
