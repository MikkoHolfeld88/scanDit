import {FilesCollection} from "../models/collections/files.collection";
import {getDatabase, onValue, ref, Database, DatabaseReference} from "@firebase/database";
import {getAuth, Auth, User} from "@firebase/auth";
import {COLLECTIONS_REALTIME_DATABASE} from "./enums/collections.realtimeDatabase";
import {Unsubscribe} from "@reduxjs/toolkit";

/**
 * Diese Funktion gibt die Dateien zurück, die einem bestimmten Benutzer (identifiziert durch die User ID) und einem bestimmten
 * Dateityp (identifiziert durch den Schlüssel) zugeordnet sind.
 * @param setUserFiles - Funktion zum Setzen der Dateien
 * @returns {() => void} - Funktion zum Abbestellen der Echtzeitdatenbank-Änderungen
 */
export const getUserFiles = (setUserFiles: (data: FilesCollection | null) => void) => {
    const db: Database = getDatabase();
    const auth: Auth = getAuth();
    const user: User | null = auth.currentUser;

    if (user) {
        const uid: string = user.uid;
        const dbFileRef: DatabaseReference = ref(db, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}`);

        const unsubscribe: Unsubscribe = onValue(dbFileRef, (snapshot) => {
            const data: FilesCollection | null = snapshot.val();

            if (data){
                setUserFiles(data);
            }
        });

        return unsubscribe;
    } else {
        setUserFiles(null);

        return () => {};
    }
};
