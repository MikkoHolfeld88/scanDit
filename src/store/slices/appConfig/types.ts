import {AppMode} from "../../../models/AppMode";
import {ListViewStylesType} from "../../../models/ListViewStylesType";
import {TemplateSortingType} from "../../../models/TemplateSortingType";
import {SourceTypePickerSetting} from "../../../models/SourceTypePickerSetting";
import {TargetType} from "../../../models/TargetType";

export interface AppConfigState {
    listViewStyle: ListViewStylesType;
    sourceTypePicker: SourceTypePickerSetting;
    targetTypePicker: TargetType;
    configurationTab: number;
    templateSorting: TemplateSortingType;
    mode: AppMode;
}
