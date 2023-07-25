import {createAsyncThunk} from "@reduxjs/toolkit";
import {firestore} from "../../../firebase/firebase";
import {COLLECTIONS_FIRESTORE} from "../../../firebase/enums/collections.firestore";

import {query, where, getDocs, collection, QueryDocumentSnapshot, DocumentData} from 'firebase/firestore';
import {Pipeline} from "../../../models/Pipeline";

export const fetchPipelines = createAsyncThunk(
    'pipeline/fetchPipelines',
    async (uid: string, {rejectWithValue}) => {
        try {
            const pipelinesCollectionRef = collection(firestore, COLLECTIONS_FIRESTORE.PIPELINES);
            const q = query(pipelinesCollectionRef, where("userId", "==", uid));
            const querySnapshot: DocumentData = await getDocs(q);
            const pipelines: Pipeline[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Pipeline);
            return pipelines;
        } catch (error: any) {
            console.log("Error getting documents: ", error);
            return rejectWithValue(error.message);
        }
    }
);
