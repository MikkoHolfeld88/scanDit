import {auth, firestore} from '../../firebase';
import {COLLECTIONS_FIRESTORE} from "../../enums/collections.firestore";
import {doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";

export const pipelineMiddleware = (action: any) => {
    const uid = auth.currentUser?.uid;

    if (action.type === 'pipeline/addPipeline') {
        const newPipeline = {
            ...action.payload,
            userId: uid
        };

        if (!newPipeline.id) {
            console.error('Pipeline does not have an id. Aborting addPipeline.');
            return;
        }

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.PIPELINES, newPipeline.id);

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
            userId: uid
        };

        const cleanedUpdatedPipeline = JSON.parse(JSON.stringify(updatedPipeline)); // removes undefined fields

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.PIPELINES, cleanedUpdatedPipeline.id);
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

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.PIPELINES, pipelineId);
        deleteDoc(docRef)
            .then(() => {
                console.log('Pipeline successfully deleted from Firestore!');
            })
            .catch((error) => {
                console.error('Error deleting pipeline: ', error);
            });
    }

};
