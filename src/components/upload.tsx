import React from 'react';
import {Button} from "primereact/button";
import {storage} from "../firebase/firebase";
import { ref, uploadBytes } from 'firebase/storage';

export const Upload = () => {
    const [file, setFile] = React.useState<File | null>(null);

    const imageRef = ref(storage, 'images/image1.jpg');

    const onFileChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    const upload = () => {
        if (!file) {
            return;
        }

        uploadBytes(imageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <Button onClick={upload}>Upload</Button>
        </div>
    );
}
