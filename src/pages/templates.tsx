import React, {useEffect} from "react";
import {TemplateHeader} from "../components/configuration/templates/templateHeader";
import {TemplateCards} from "../components/configuration/templates/templateCards";
import {Divider} from "@mui/material";
import {AppDispatch, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {selectAppMode} from "../store/slices/appConfig/selectors";
import {AppMode} from "../models/AppMode";
import {APP_MODE} from "../enums/appMode.enum";
import {setAppMode} from "../store/slices/appConfig/reducers";

export const Templates = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);

    useEffect(() => {
        const handleClick = (event: Event) => {
            const target = event.target as Element;

            if (target.closest("#template-delete-speeddial-icon")) {
                return;
            }

            if(appMode === APP_MODE.DEFAULT){
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
        <React.Fragment>
            <TemplateHeader/>

            <Divider/>

            <TemplateCards/>

        </React.Fragment>
    );
}
