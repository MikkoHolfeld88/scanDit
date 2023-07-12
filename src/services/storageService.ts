import {MIME_TYPE} from "../enums/mimeType.enum";
import {mimeTypeToDatabasePathMapper} from "../constants/mimeTypeToDatabasePathMapper";
import {REALTIME_DATABASE_PATHS} from "../constants/realtimeDatabasePaths";
import {getAuth} from "firebase/auth";

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
