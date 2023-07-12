import {RootState} from "../../store";

export const selectListViewStyle = (state: RootState) => state.appConfig.listViewStyle;
export const selectConfigurationTab = (state: RootState) => state.appConfig.configurationTab;
