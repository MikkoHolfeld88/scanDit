import {Dispatch, Middleware} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';
import {RootState} from "../../store/store";
import {pipelineMiddleware} from './handlers/pipelineMiddleware';
import {templateMiddleware} from './handlers/templateMiddleware';
import {auth} from '../firebase';

const firestoreMiddleware: Middleware<{}, RootState> = () => (next: Dispatch) => (action: AnyAction) => {

    if (!auth.currentUser?.uid) {
        console.error('Could not verify user id. Aborting firestore middleware.')
        return;
    }

    const result = next(action);

    if (action.type.startsWith('pipeline/')) {
        pipelineMiddleware(action);
    } else if (action.type.startsWith('template/')) {
        templateMiddleware(action);
    }

    return result;
};

export default firestoreMiddleware;
