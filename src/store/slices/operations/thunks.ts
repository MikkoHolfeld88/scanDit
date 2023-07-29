import {createAsyncThunk} from "@reduxjs/toolkit";
import {firestore} from "../../../firebase/firebase";
import {COLLECTIONS_FIRESTORE} from "../../../firebase/enums/collections.firestore";

import {collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where} from 'firebase/firestore';
import {Operation} from "../../../models/Operation";

export const fetchOperations = createAsyncThunk(
    'operation/fetchOperations',
    async (uid: string, {rejectWithValue}) => {
        try {
            const templatesCollectionRef = collection(firestore, COLLECTIONS_FIRESTORE.OPERATIONS);
            const q = query(templatesCollectionRef, where("userId", "==", uid));
            const querySnapshot: DocumentData = await getDocs(q);
            const operations: Operation[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Operation);
            return operations;
        } catch (error: any) {
            console.log("Error getting documents: ", error);
            return rejectWithValue(error.message);
        }
    }
);
