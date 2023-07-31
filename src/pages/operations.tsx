import {AppDispatch, useAppDispatch} from "../store/store";
import {AppMode} from "../models/AppMode";
import {useSelector} from "react-redux";
import {selectAppMode} from "../store/slices/appConfig/selectors";
import React, {useEffect} from "react";
import {APP_MODE} from "../enums/appMode.enum";
import {setAppMode} from "../store/slices/appConfig/reducers";
import {OperationsList} from "../components/configuration/operations/operationsList";

export const Operations = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);

    useEffect(() => {
        const handleClick = (event: Event) => {
            const target = event.target as Element;

            if (target.closest("#operation-delete-speeddial-icon")) {
                return;
            }

            if (appMode === APP_MODE.DEFAULT) {
                return;
            } else {
                dispatch(setAppMode(APP_MODE.DEFAULT));
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }

    }, [appMode]);

    return (
        <div id="operations-management-container">
            <OperationsList/>
        </div>
    );
}
