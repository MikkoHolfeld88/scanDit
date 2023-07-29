import {auth, firestore} from '../../firebase';
import {COLLECTIONS_FIRESTORE} from "../../enums/collections.firestore";
import {doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";

export const operationMiddleware = (action: any) => {
    const uid = auth.currentUser?.uid;

    if (action.type === 'operation/addOperation') {
        const newTemplate = {
            ...action.payload,
            userId: uid
        };

        if (!newTemplate.id) {
            console.error('Operation does not have an id. Aborting addOperation.');
            return;
        }

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.OPERATIONS, newTemplate.id);

        setDoc(docRef, newTemplate)
            .then(() => {
                console.log(`New operation added with ID: ${newTemplate.id}`);
            })
            .catch(error => {
                console.error('Error adding operation: ', error);
            });
    }

    if (action.type === 'operation/editOperation') {
        const updatedOperation = {
            ...action.payload,
            userId: uid
        };

        const cleanedUpdatedTemplates = JSON.parse(JSON.stringify(updatedOperation)); // removes undefined fields

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.OPERATIONS, cleanedUpdatedTemplates.id);
        updateDoc(docRef, cleanedUpdatedTemplates)
            .then(() => {
                console.log('Operation successfully updated in Firestore!');
            })
            .catch((error) => {
                console.error('Error updating Operation: ', error);
            });
    }

    if (action.type === 'operation/deleteOperation') {
        const templateId = action.payload;

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.OPERATIONS, templateId);
        deleteDoc(docRef)
            .then(() => {
                console.log('Operation successfully deleted from Firestore!');
            })
            .catch((error) => {
                console.error('Error deleting operation: ', error);
            });
    }

};
