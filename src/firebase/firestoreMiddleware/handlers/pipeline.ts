import {RootState} from "../../../store/store";
import {Pipeline} from "../../../models/Pipeline";
import {doc, DocumentReference, Firestore, getFirestore, setDoc} from "firebase/firestore";
import {Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {COLLECTIONS_FIRESTORE} from "../../enums/collections.firestore";

export const synchronizePipelineState = (storeAPI: MiddlewareAPI<Dispatch, RootState>, action: AnyAction, uid: string) => {
    const state: RootState = storeAPI.getState();

    const db: Firestore = getFirestore();
    const docRef: DocumentReference = doc(db, COLLECTIONS_FIRESTORE.PIPELINES, uid);

    const pipelines: Pipeline[] = state.pipeline.pipelines;

    console.log(pipelines);
    console.log(docRef);

    setDoc(docRef, {pipelines}, {merge: true})
        .then(() => {
            console.log('Pipelines successfully written in Firestore!');
        })
        .catch((error) => {
            console.error('Error writing pipelines: ', error);
        });
}
