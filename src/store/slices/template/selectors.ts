import {RootState} from "../../store";

export const selectTemplates = (state: RootState) => state.template.templates;
export const selectSearchValue = (state: RootState) => state.template.templateSearch;
export const selectTemplateById = (id: string) => (state: RootState) => state.template.templates.find(template => template.id === id);
export const selectTemplateStatus = (state: RootState) => state.template.status;
