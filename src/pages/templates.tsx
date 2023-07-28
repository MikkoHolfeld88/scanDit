import React, {useEffect} from "react";
import {TemplateHeader} from "../components/configuration/templates/templateHeader";
import {TemplateCards} from "../components/configuration/templates/templateCards";
import {Divider} from "@mui/material";
import {User} from "@firebase/auth";
import {auth} from "../firebase/firebase";
import {AppDispatch, useAppDispatch} from "../store/store";
import {fetchTemplates} from "../store/slices/template/thunks";

export const Templates = () => {
    const USER: User | null = auth.currentUser;
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        if (!USER?.uid) {
            console.error("Could not access user id. Aborted fetching pipelines.")
        }

        if (USER?.uid) {
            dispatch(fetchTemplates(USER?.uid));
        }
    }, [])

    return (
        <React.Fragment>
            <TemplateHeader/>

            <Divider/>

            <TemplateCards/>

        </React.Fragment>
    );
}
