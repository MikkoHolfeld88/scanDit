import {DataState} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {File} from "../../../models/File";

const initialState: DataState = {
    isUploading: false,
    files: null,
    selectedFiles: null,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            if (action.payload) {
                // Typassertion, um TypeScript über den erwarteten Typ der Werte zu informieren
                const filesArray: File[] = Object.values(action.payload as { [key: string]: File });

                // Sortieren Sie das Array alphabetisch nach dem filenameToDisplay, oder verwenden Sie filename, falls filenameToDisplay undefined ist
                const sortedFilesArray = filesArray.sort((a, b) =>
                    (a.filenameToDisplay || a.filename).localeCompare(b.filenameToDisplay || b.filename));

                // Konvertieren Sie das sortierte Array zurück in ein Objekt
                const sortedFilesObject = Object.fromEntries(
                    sortedFilesArray.map(file => [file.id || '', file])
                );

                state.files = sortedFilesObject;
            } else {
                state.files = action.payload;
            }
            state.isUploading = false;
        },
        setIsUploading: (state, action) => {
            state.isUploading = action.payload;
        }
    }
});

export const {setFiles, setIsUploading } = dataSlice.actions;

export default dataSlice.reducer;
