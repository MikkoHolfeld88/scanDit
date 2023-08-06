import {RootState} from "../../store";

export const selectTemplates = (state: RootState) => state.template.templates;
export const selectSearchValue = (state: RootState) => state.template.templateSearch;
export const selectTemplateById = (id: string) => (state: RootState) => state.template.templates.find(template => template.id === id);
export const selectTemplateStatus = (state: RootState) => state.template.status;
export const selectLatestCreatedTemplate = (state: RootState) => {
    const templatesCopy = [...state.template.templates];
    return templatesCopy.sort((a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )[0];
}
