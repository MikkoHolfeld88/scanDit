import {FilesCollection} from "../models/collections/files.collection";
import {DatabaseReference, onValue, ref} from "@firebase/database";
import {User} from "@firebase/auth";
import {COLLECTIONS_REALTIME_DATABASE} from "./enums/collections.realtimeDatabase";
import {Unsubscribe} from "@reduxjs/toolkit";
import {auth, realtimeDatabase} from "./firebase";

/**
 * Diese Funktion gibt die Dateien zurück, die einem bestimmten Benutzer (identifiziert durch die User ID) und einem bestimmten
 * Dateityp (identifiziert durch den Schlüssel) zugeordnet sind.
 * @param setUserFiles - Funktion zum Setzen der Dateien
 * @returns {() => void} - Funktion zum Abbestellen der Echtzeitdatenbank-Änderungen
 */
export const getUserFiles = (setUserFiles: (data: FilesCollection | null) => void) => {
    const user: User | null = auth.currentUser;

    if (user) {
        const uid: string = user.uid;
        const dbFileRef: DatabaseReference = ref(realtimeDatabase, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}`);

        const unsubscribe: Unsubscribe = onValue(dbFileRef, (snapshot) => {
            const data: FilesCollection | null = snapshot.val();

            if (data) {
                setUserFiles(data);
            }
        });

        return unsubscribe;
    } else {
        setUserFiles(null);

        return () => {
        };
    }
};
