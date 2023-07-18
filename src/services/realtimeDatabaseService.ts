import {User} from "firebase/auth";
import {DatabaseReference, DataSnapshot, get, getDatabase, ref, set, update, remove} from "firebase/database";
import {COLLECTIONS_REALTIME_DATABASE} from "../firebase/enums/collections.realtimeDatabase";
import {v4 as uuidv4} from 'uuid';
import {File as FileObject} from "../models/File";
import {auth, realtimeDatabase} from "../firebase/firebase";

/**
 * Diese Funktion lädt eine Datei in Firebase Storage hoch und speichert die Metadaten in der Realtime Database.
 * @param filePathURL - Pfad zur Datei
 * @param filetype - Name des filetypes
 * @param filename - Name der Datei
 * @param tags - Kategorie der Datei
 */
export const postFile = async (filePathURL: string, filetype: string, filename: string) => {
    const user: User | null = auth.currentUser;

    if (user) {
        const uid: string = user.uid;
        const newFileData: FileObject = {
            id: uuidv4(),
            filename: filename,
            uploaded: new Date().toISOString(),
            url: filePathURL,
            filetype: filetype,
        };

        // Erstelle Referenz zum Dateiordner
        const filesRef: DatabaseReference = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}`);

        // Lade die aktuellen Daten
        const snapshot: DataSnapshot = await get(filesRef);

        // Prüfe, ob eine Datei mit demselben Namen existiert
        const existingFile = snapshot.exists() && Object.values(snapshot.val() as Record<string, FileObject>).find((file: FileObject) => file.filename === filename);

        if (existingFile) {
            // Wenn die Datei existiert, aktualisiere sie
            const fileRef: DatabaseReference = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}/${existingFile.id}`);
            try {
                await update(fileRef, newFileData);
            } catch (error) {
                console.error("Failed to update file in Realtime Database:", error);
            }
        } else {
            // Wenn die Datei nicht existiert, erstelle sie
            const fileRef: DatabaseReference = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}/${newFileData.id}`);
            try {
                await set(fileRef, newFileData);
            } catch (error) {
                console.error("Failed to add new file to Realtime Database:", error);
            }
        }
    }
}

/**
 * Diese Funktion aktualisiert den Dateinamen einer bestimmten Datei in der Firebase Realtime Database.
 *
 * @param {string} fileId - Die eindeutige ID der Datei, deren Name aktualisiert werden soll.
 * @param {string} newFilename - Der neue Dateiname.
 *
 * @returns {Promise<void>} Eine Promise, die sich auflöst, wenn die Aktualisierung erfolgreich war.
 * Wenn während der Aktualisierung ein Fehler auftritt, wird dieser Fehler in der Konsole protokolliert.
 *
 * @throws {Error} Wirft einen Fehler, wenn die Aktualisierung fehlschlägt.
 */
export const updateFilenameInDatabase = async (fileId: string | undefined, newFilename: string) => {
    if (!fileId || !newFilename) {
        return;
    }

    const user: User | null = auth.currentUser;

    if (user) {
        const uid: string = user.uid;

        const fileRef: DatabaseReference = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}/${fileId}`);

        try {
            await update(fileRef, { filename: newFilename, updated: new Date().toISOString() });
        } catch (error) {
            console.error("Failed to update filename in Realtime Database:", error);
        }
    }
}

/**
 * Diese Funktion löscht eine bestimmte Datei aus der Firebase Realtime Database.
 *
 * @param {string} fileId - Die eindeutige ID der zu löschenden Datei.
 *
 * @returns {Promise<void>} Eine Promise, die sich auflöst, wenn die Löschung erfolgreich war.
 * Wenn während der Löschung ein Fehler auftritt, wird dieser Fehler in der Konsole protokolliert.
 *
 * @throws {Error} Wirft einen Fehler, wenn die Löschung fehlschlägt.
 */
export const deleteFileFromDatabase = async (fileId: string | undefined) => {
    if (!fileId) {
        return;
    }

    const user: User | null = auth.currentUser;

    if (user) {
        const uid: string = user.uid;

        const fileRef: DatabaseReference = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}/${fileId}`);

        try {
            await set(fileRef, null); // Setze den Wert der Datei auf null, um sie zu löschen
        } catch (error) {
            console.error("Failed to delete file from Realtime Database:", error);
        }
    }
}

/**
 * Diese Funktion verschiebt eine bestimmte Datei in den "deletedFiles" Table der Firebase Realtime Database.
 *
 * @param {FileObject} file - Die zu verschiebende Datei.
 *
 * @returns {Promise<void>} Eine Promise, die sich auflöst, wenn der Vorgang erfolgreich war.
 * Wenn während des Vorgangs ein Fehler auftritt, wird dieser Fehler in der Konsole protokolliert.
 *
 * @throws {Error} Wirft einen Fehler, wenn der Vorgang fehlschlägt.
 */
export const moveToDeletedFiles = async (file: FileObject | null) => {
    if (!file) {
        console.error("Failed to delete file in Realtime Database: file is null")
        return;
    }

    const user: User | null = auth.currentUser;

    if (user) {
        const uid: string = user.uid;
        const database = getDatabase();

        const filesRef = `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}/${file.id}`;
        const deletedFilesRef = `/${uid}/${COLLECTIONS_REALTIME_DATABASE.DELETED_FILES}/${file.id}`;

        try {
            await remove(ref(database, filesRef)); // Lösche die Datei aus dem "files" Table
            await set(ref(database, deletedFilesRef), file); // Verschiebe die Datei in den "deletedFiles" Table
        } catch (error) {
            console.error("Failed to move file to deletedFiles in Realtime Database:", error);
        }
    }
}
