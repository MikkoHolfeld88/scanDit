import {File} from "../../../models/File";

export interface DataState {
    files: File[] | null,
    isUploading: boolean,
    selectedFiles: File[] | null,
}
