import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {doc, setDoc} from "@firebase/firestore";
import {auth, firestore} from "./firebase";
import {COLLECTIONS_FIRESTORE} from "./enums/collections.firestore";

const getAuthprovider = (email: string) => {
    return email.substring(
        email.indexOf("@") + 1,
        email.lastIndexOf(".")
    );
}

export const registerWithEmailAndPassword = async (name: any, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const docRef = doc(firestore, COLLECTIONS_FIRESTORE.USERS, user.uid);

        await setDoc(docRef, {
            uid: user.uid,
            name: name,
            authProvider: getAuthprovider(email),
            email: email,
            created: new Date()
        });
    } catch (error: any) {
        console.error(error.message, error);
        return error;
    }
}

export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        console.error(error.message, error);
        return error;
    }
}

export const logout = async () => {
    try {
        await auth.signOut();
    } catch (error: any) {
        console.error(error.message, error);
        return error;
    }
}
