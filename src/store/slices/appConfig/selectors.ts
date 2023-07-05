import {RootState} from "../../store";

export const selectListViewStyle = (state: RootState) => state.appConfig.listViewStyle;
