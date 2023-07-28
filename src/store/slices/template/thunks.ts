import {createAsyncThunk} from "@reduxjs/toolkit";
import {firestore} from "../../../firebase/firebase";
import {COLLECTIONS_FIRESTORE} from "../../../firebase/enums/collections.firestore";

import {collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where} from 'firebase/firestore';
import {Template} from "../../../models/Template";

export const fetchTemplates = createAsyncThunk(
    'template/fetchTemplates',
    async (uid: string, {rejectWithValue}) => {
        try {
            const templatesCollectionRef = collection(firestore, COLLECTIONS_FIRESTORE.TEMPLATES);
            const q = query(templatesCollectionRef, where("userId", "==", uid));
            const querySnapshot: DocumentData = await getDocs(q);
            const templates: Template[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Template);
            return templates;
        } catch (error: any) {
            console.log("Error getting documents: ", error);
            return rejectWithValue(error.message);
        }
    }
);
