import {auth, firestore} from '../../firebase';
import {COLLECTIONS_FIRESTORE} from "../../enums/collections.firestore";
import {doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import {Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {RootState} from "../../../store/store";
import {AnyAction} from "redux";
import {selectTemplateById} from "../../../store/slices/template/selectors";

export const templateMiddleware = (store: MiddlewareAPI<Dispatch, RootState>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    const uid = auth.currentUser?.uid;

    if (action.type === 'template/addTemplate') {
        const newTemplate = {
            ...action.payload,
            userId: uid
        };

        if (!newTemplate.id) {
            console.error('Template does not have an id. Aborting addTemplate.');
            return;
        }

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.TEMPLATES, newTemplate.id);

        setDoc(docRef, newTemplate)
            .then(() => {
                console.log(`New template added with ID: ${newTemplate.id}`);
            })
            .catch(error => {
                console.error('Error adding template: ', error);
            });
    }

    if (action.type === 'template/editTemplate') {
        const updatedTemplate = {
            ...action.payload,
            userId: uid
        };

        const cleanedUpdatedTemplate = JSON.parse(JSON.stringify(updatedTemplate)); // removes undefined fields

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.TEMPLATES, cleanedUpdatedTemplate.id);
        updateDoc(docRef, cleanedUpdatedTemplate)
            .then(() => {
                console.log('Template successfully updated in Firestore!');
            })
            .catch((error) => {
                console.error('Error updating template: ', error);
            });
    }

    if (action.type === 'template/deleteTemplate') {
        const templateId = action.payload;

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.TEMPLATES, templateId);
        deleteDoc(docRef)
            .then(() => {
                console.log('Template successfully deleted from Firestore!');
            })
            .catch((error) => {
                console.error('Error deleting template: ', error);
            });
    }

    if (action.type === 'template/saveTemplateOperations') {
        const template = selectTemplateById(action.payload.id)(store.getState());

        const updatedTemplate = {
            ...template,
            operations: action.payload.operations
        }

        const cleanedUpdatedTemplate = JSON.parse(JSON.stringify(updatedTemplate)); // removes undefined fields

        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.TEMPLATES, action.payload.id);
        updateDoc(docRef, cleanedUpdatedTemplate)
            .then(() => {
                console.log('Template operations successfully updated in Firestore!');
            })
            .catch((error) => {
                console.error('Error updating template operations: ', error);
            });
    }

};
