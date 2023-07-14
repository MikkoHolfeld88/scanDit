import {RootState} from "../../store";
import {createSelector} from "@reduxjs/toolkit";
import {File} from "../../../models/File";

export const selectFiles = (state: RootState) => state.data.files;
export const selectIsUploading = (state: RootState) => state.data.isUploading;
export const selectFilesAsArray = createSelector(
    selectFiles,
    (files) => {
        return Object.values(files ?? {}) as File[];
    }
)
export const selectSelectedFiles = (state: RootState) => state.data.selectedFiles;
