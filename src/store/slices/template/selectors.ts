import {RootState} from "../../store";

export const selectTemplates = (state: RootState) => state.template.templates;
export const selectSearchValue = (state: RootState) => state.template.templateSearch;
