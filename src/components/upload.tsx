import React from 'react';
import {Button} from "primereact/button";
import {storage} from "../firebase/firebase";
import {ref, uploadBytes} from 'firebase/storage';
import {createStorageName} from "../services/uploadService";

export const Upload = () => {
    const [file, setFile] = React.useState<File | null>(null);

    const onFileChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    const upload = () => {
        if (!file) {
            console.error("No file selected");
            return;
        }

        const imageRef = ref(storage, createStorageName(file));

        uploadBytes(imageRef, file).then((snapshot) => {
            console.log("Uploaded", file.name);
        });
    }

    return (
        <div>
            <input type="file" onChange={onFileChange}/>
            <Button onClick={upload}>Upload</Button>
        </div>
    );
}
