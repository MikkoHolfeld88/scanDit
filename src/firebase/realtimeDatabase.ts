import {DatabaseReference, onValue, ref} from "@firebase/database";
import {User} from "@firebase/auth";
import {COLLECTIONS_REALTIME_DATABASE} from "./enums/collections.realtimeDatabase";
import {Unsubscribe} from "@reduxjs/toolkit";
import {auth, realtimeDatabase} from "./firebase";
import {File} from "../models/File";

export const getUserFiles = (setUserFiles: (data: File[] | null) => void) => {
    const USER: User | null = auth.currentUser;

    if (USER) {
        const UID: string = USER?.uid ?? '';
        const dbFileRef: DatabaseReference = ref(realtimeDatabase, `/${UID}/${COLLECTIONS_REALTIME_DATABASE.FILES}`);

        const unsubscribe: Unsubscribe = onValue(dbFileRef, (snapshot) => {

            const data: File[] | null = snapshot.val();

            if (data) {
                setUserFiles(data);
            }
        });

        return unsubscribe;
    } else {
        setUserFiles(null);

        return () => {};
    }
};
