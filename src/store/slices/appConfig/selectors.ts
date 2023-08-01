import {RootState} from "../../store";
import {CONFIGURATION_TAB_NAMES} from "../../../enums/configurationTabNames.enum";

export const selectListViewStyle = (state: RootState) => state.appConfig.listViewStyle;
export const selectSourceTypePicker = (state: RootState) => state.appConfig.sourceTypePicker;
export const selectConfigurationTab = (state: RootState) => state.appConfig.configurationTab;
export const selectConfigurationTabNames = (state: RootState) => {
    switch (state.appConfig.configurationTab) {
        case 0: return CONFIGURATION_TAB_NAMES.PIPELINES;
        case 1: return CONFIGURATION_TAB_NAMES.TEMPLATES;
        case 2: return CONFIGURATION_TAB_NAMES.OPERATIONS;
        default: return null;
    }
};
export const selectTemplateSorting = (state: RootState) => state.appConfig.templateSorting;
export const selectAppMode = (state: RootState) => state.appConfig.mode;

