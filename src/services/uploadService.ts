import {getAuth} from "firebase/auth";
import {REALTIME_DATABASE_PATHS} from "../constants/realtimeDatabasePaths";
import {child, get, getDatabase, ref, set, update} from "firebase/database";
import {COLLECTIONS_REALTIME_DATABASE} from "../firebase/enums/collections.realtimeDatabase";
import {CollectionsFiles, RealtimeDatabasePaths} from "../firebase/types/collections.files";
import {mimeTypeToDatabasePathMapper} from "../constants/mimeTypeToDatabasePathMapper";
import {MIME_TYPE} from "../enums/mimeType.enum";

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
    const realtimeDatabase = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const uid = user.uid;
        const dbRef = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}/${databasePathName}`);

        let currentData: CollectionsFiles[keyof RealtimeDatabasePaths] | undefined = [];

        try {
            const snapshot = await (get(child(dbRef, '/')));

            if (snapshot.exists()) {
                currentData = snapshot.val() ?? [];
            }
        } catch (error) {
            console.error("Failed to load data from Realtime Database:", error);
            return;
        }

        const existingIndex = currentData?.findIndex((data) => data.filename === filename) ?? -1;

        const newFileData = {
            uploaded: new Date().toString(),
            filename: filename,
            url: filePathURL,
        };

        if (existingIndex !== -1) {
            // Update existing file
            if (currentData) {
                currentData[existingIndex] = newFileData;
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

