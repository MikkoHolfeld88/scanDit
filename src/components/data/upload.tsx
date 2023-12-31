import React, {useRef} from 'react';
import {Button, CircularProgress} from "@mui/material";
import {storage} from "../../firebase/firebase";
import {getDownloadURL, ref, uploadBytes, StorageReference} from 'firebase/storage';
import {postFile} from "../../services/realtimeDatabaseService";
import {createStorageName, mapDatatypeToDatabasePath} from "../../services/storageService";
import {useAppDispatch} from "../../store/store";
import {setIsUploading} from "../../store/slices/data/reducers";
import UploadIcon from '@mui/icons-material/Upload';
import {useSelector} from "react-redux";
import {selectIsUploading} from "../../store/slices/data/selectors";

interface UploadProps {
    fullWidth?: boolean;
    noBorderRadius?: boolean;
}

export const Upload = (props: UploadProps) => {
    const dispatch = useAppDispatch();
    const isUploading = useSelector(selectIsUploading);
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
        const imageRef: StorageReference = ref(storage, storagePathName);

        const filetype: string = mapDatatypeToDatabasePath(file);

        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((filePathURL) => {
                postFile(filePathURL, filetype, file.name)
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
                style={{borderRadius: props.noBorderRadius ? 0 : undefined}}
                fullWidth={props.fullWidth}
                variant='contained'
                onClick={handleClick}
                endIcon={isUploading ?
                    <CircularProgress color="secondary" size={20}/> :
                    <UploadIcon color="secondary"/>
            }>
                Upload
            </Button>
        </React.Fragment>
    );
}
