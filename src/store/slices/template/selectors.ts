import {RootState} from "../../store";

export const selectTemplates = (state: RootState) => state.template.templates;
