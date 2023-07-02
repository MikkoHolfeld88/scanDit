import {RootState} from "../store";

export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state_scandit', serializedState);
    } catch {
        // ignoriert Schreibfehler
    }
};
