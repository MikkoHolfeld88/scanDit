import {CollectionsFiles} from "./types/collections.files";
import {getDatabase, onValue, ref} from "@firebase/database";
import {getAuth} from "@firebase/auth";
import {COLLECTIONS_REALTIME_DATABASE} from "./enums/collections.realtimeDatabase";

/**
 * Diese Funktion gibt die Dateien zurück, die einem bestimmten Benutzer (identifiziert durch die User ID) und einem bestimmten
 * Dateityp (identifiziert durch den Schlüssel) zugeordnet sind.
 * @param setUserFiles - Funktion zum Setzen der Dateien
 * @returns {() => void} - Funktion zum Abbestellen der Echtzeitdatenbank-Änderungen
 */
export const getUserFiles = (setUserFiles: (data: CollectionsFiles | null) => void) => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const uid = user.uid;
        const dbFileRef = ref(db, `/${uid}/${COLLECTIONS_REALTIME_DATABASE.FILES}`);

        const unsubscribe = onValue(dbFileRef, (snapshot) => {
            const data = snapshot.val();

            setUserFiles(data);
        });

        return unsubscribe;
    } else {
        setUserFiles(null);

        return () => {
        };
    }
};
