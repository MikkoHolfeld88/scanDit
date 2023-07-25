import {Dispatch, Middleware, MiddlewareAPI} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';
import {auth, firestore} from '../firebase';
import {RootState} from "../../store/store";
import {doc, addDoc, collection, deleteDoc, updateDoc} from "firebase/firestore";
import {setDoc} from "@firebase/firestore";

const firestoreMiddleware: Middleware<{}, RootState> = (storeAPI: MiddlewareAPI<Dispatch, RootState>) => (next: Dispatch) => (action: AnyAction) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
        console.error('Could not verify user id. Aborting firestore middleware.')
        return;
    }

    const result = next(action);

    const pipelinesCollectionRef = collection(firestore, 'pipelines');

    if (action.type === 'pipeline/addPipeline') {
        const newPipeline = {
            ...action.payload,
            userId: uid
        };

        if (!newPipeline.id) {
            console.error('Pipeline does not have an id. Aborting addPipeline.');
            return;
        }

        const docRef = doc(firestore, 'pipelines', newPipeline.id);

        setDoc(docRef, newPipeline)
            .then(() => {
                console.log(`New pipeline added with ID: ${newPipeline.id}`);
            })
            .catch(error => {
                console.error('Error adding pipeline: ', error);
            });
    }

    if (action.type === 'pipeline/editPipeline') {
        const updatedPipeline = {
            ...action.payload,
            userId: uid  // ensure userId is also updated
        };

        const cleanedUpdatedPipeline = JSON.parse(JSON.stringify(updatedPipeline)); // removes undefined fields

        const docRef = doc(firestore, 'pipelines', cleanedUpdatedPipeline.id);
        updateDoc(docRef, cleanedUpdatedPipeline)
            .then(() => {
                console.log('Pipeline successfully updated in Firestore!');
            })
            .catch((error) => {
                console.error('Error updating pipeline: ', error);
            });
    }

    if (action.type === 'pipeline/deletePipeline') {
        const pipelineId = action.payload;

        const docRef = doc(firestore, 'pipelines', pipelineId);
        deleteDoc(docRef)
            .then(() => {
                console.log('Pipeline successfully deleted from Firestore!');
            })
            .catch((error) => {
                console.error('Error deleting pipeline: ', error);
            });
    }

    return result;
};

export default firestoreMiddleware;
