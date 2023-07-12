import {User} from "firebase/auth";
import {DatabaseReference, DataSnapshot, get, ref, set, update} from "firebase/database";
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
