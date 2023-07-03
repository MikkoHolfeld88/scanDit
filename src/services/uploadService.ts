import {getAuth} from "firebase/auth";
import {REALTIME_DATABASE_PATHS} from "../constants/realtimeDatabasePaths";

const mimeTypeToDatabasePathMapper: { [key: string]: string } = {
    'image/png': REALTIME_DATABASE_PATHS.IMAGES,
    'image/jpg': REALTIME_DATABASE_PATHS.IMAGES,
    'image/jpeg': REALTIME_DATABASE_PATHS.IMAGES,
    'image/gif': REALTIME_DATABASE_PATHS.IMAGES,
    'text/csv': REALTIME_DATABASE_PATHS.CSV,
    'application/json': REALTIME_DATABASE_PATHS.JSON,
    'text/xml': REALTIME_DATABASE_PATHS.XML,
    'application/pdf': REALTIME_DATABASE_PATHS.PDF,
}

export const mapDatatypeToDatabasePath = (file: File): string => {
    const mimeType = file.type;

    return mimeTypeToDatabasePathMapper[mimeType] || REALTIME_DATABASE_PATHS.UNKNOWN;
}

export const createStorageName = (file: File) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const databasePath: string = mapDatatypeToDatabasePath(file);

    if (user) {
        return `${user.uid}/${databasePath}/${file.name}`
    }
}
