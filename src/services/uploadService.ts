import {getAuth, User, Auth} from "firebase/auth";
import {REALTIME_DATABASE_PATHS} from "../constants/realtimeDatabasePaths";
import {child, get, getDatabase, ref, set, Database, DatabaseReference, DataSnapshot} from "firebase/database";
import {COLLECTIONS_REALTIME_DATABASE} from "../firebase/enums/collections.realtimeDatabase";
import {RealtimeDatabasePaths} from "../models/RealtimeDatabasePaths";
import {FilesCollection} from "../models/collections/files.collection"
import {mimeTypeToDatabasePathMapper} from "../constants/mimeTypeToDatabasePathMapper";
import {MIME_TYPE} from "../enums/mimeType.enum";
import {v4 as uuidv4} from 'uuid';
import {File as FileObject} from "../models/File";

export const mapDatatypeToDatabasePath = (file: File): string => {
    const mimeType = file.type as MIME_TYPE;

    return mimeTypeToDatabasePathMapper[mimeType] || REALTIME_DATABASE_PATHS.UNKNOWN;
}

export const createStorageName = (file: File): string => {
    const auth = getAuth();
    const user = auth.currentUser;

    const databasePath: string = mapDatatypeToDatabasePath(file);

    if (user) {
        return `${user.uid}/${databasePath}/${file.name}`
    }

    console.error('User is not logged in!')
    throw new Error('User is not logged in!')
}

export const postFile = async (
    filePathURL: string,
    databasePathName: string,
    filename: string
) => {
    const realtimeDatabase: Database = getDatabase();
    const auth: Auth = getAuth();
    const user: User | null = auth.currentUser;

    if (user) {
        const uid: string = user.uid;
        const dbRef: DatabaseReference = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}/${databasePathName}`);

        let currentData: FileObject[] | undefined = [];

        try {
            const snapshot: DataSnapshot = await (get(child(dbRef, '/')));

            if (snapshot.exists()) {
                currentData = snapshot.val() ?? [];
            }
        } catch (error) {
            console.error("Failed to load data from Realtime Database:", error);
            return;
        }

        const existingIndex = currentData?.findIndex((data) => data.filename === filename) ?? -1;

        const newFileData: FileObject = {
            uploaded: new Date().toString(),
            filename: filename,
            url: filePathURL,
            id: uuidv4()
        };

        if (existingIndex !== -1) {
            // Update existing file
            if (currentData) {
                // keeps everything from newFileData except the id
                currentData[existingIndex] = {...newFileData, id: currentData[existingIndex].id};
            }
        } else {
            // Add new file
            if (currentData) {
                currentData.push(newFileData);
            } else {
                console.error("Could not add data to currentData. CurrentData is undefined.")
            }
        }

        try {
            await set(dbRef, currentData);
        } catch (error) {
            console.error("Failed to set data in Realtime Database:", error);
        }
    }
}

