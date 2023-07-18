import {File} from "../../../models/File";

export interface DataState {
    files: { [key: string]: File } | null,
    isUploading: boolean,
    selectedFiles: File[] | null,
}
