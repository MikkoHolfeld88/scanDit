import React, {useEffect} from "react";
import {PipelineList} from "../components/configuration/pipelines/pipelineList";
import "./style.css"
import {AppDispatch, useAppDispatch} from "../store/store";
import {fetchPipelines} from "../store/slices/pipeline/thunks";
import {User} from "@firebase/auth";
import {auth} from "../firebase/firebase";

export const Pipelines = () => {
    const USER: User | null = auth.currentUser;
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        if (!USER?.uid){
            console.error("Could not access user id. Aborted fetching pipelines.")
        }

        if (USER?.uid) {
            dispatch(fetchPipelines(USER?.uid));
        }
    }, [])

    return (
        <div id="pipeline-management-container">
            <PipelineList/>
        </div>
    );
}
