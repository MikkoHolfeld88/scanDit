import {SourceTypePickerSetting} from "./SourceTypePickerSetting";

export interface Source {
    data?: any;
    dataUrl?: string;
    filetype?: string;
    type: SourceTypePickerSetting;
}
