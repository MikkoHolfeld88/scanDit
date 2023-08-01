import {AppMode} from "../../../models/AppMode";
import {ListViewStylesType} from "../../../models/ListViewStylesType";
import {TemplateSortingType} from "../../../models/TemplateSortingType";
import {SourceTypePickerSetting} from "../../../models/SourceTypePickerSetting";

export interface AppConfigState {
    listViewStyle: ListViewStylesType;
    sourceTypePicker: SourceTypePickerSetting;
    configurationTab: number;
    templateSorting: TemplateSortingType;
    mode: AppMode;
}
