import React, {useRef} from 'react';
import {Button} from "@mui/material";
import {storage} from "../../firebase/firebase";
import {getDownloadURL, ref, uploadBytes, StorageReference} from 'firebase/storage';
import {createStorageName, mapDatatypeToDatabasePath, postFile} from "../../services/uploadService";
import {useAppDispatch} from "../../store/store";
import {setIsUploading} from "../../store/slices/data/reducers";

export const Upload = () => {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileChange = (e: any) => {
        const selectedFile: File | null = e.target.files[0];

        if (!selectedFile) {
            console.error("No file selected");
            return;
        }

        upload(selectedFile);
    }

    const upload = (file: File) => {
        dispatch(setIsUploading(true));
        const storagePathName: string = createStorageName(file);
        const filetype: string = mapDatatypeToDatabasePath(file);
        const imageRef: StorageReference = ref(storage, storagePathName);

        uploadBytes(imageRef, file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((filePathURL) => {
                        postFile(filePathURL, filetype, file.name);
                });
        });
    }

    const handleClick = () => {
        if (!fileInputRef.current) {
            console.error("No file input ref found");
            return;
        }

        fileInputRef.current.click();
    }

    return (
        <React.Fragment>
            <input
                ref={fileInputRef}
                style={{display: 'none'}}
                type="file"
                onChange={onFileChange}/>
            <Button
                variant='contained'
                onClick={handleClick}>
                Upload
            </Button>
        </React.Fragment>
    );
}
