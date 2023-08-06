import React, {useEffect, useState} from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {setAppMode} from "../../../store/slices/appConfig/reducers";
import {APP_MODE} from "../../../enums/appMode.enum";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {TemplateCreationDialog} from "./dialogs/templateCreationDialog";
import {useSelector} from "react-redux";
import {AppMode} from "../../../models/AppMode";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import ExtensionIcon from "@mui/icons-material/Extension";

enum TemplateSpeedDialActionNames {
    DELETE = 'Delete',
    CREATE = 'Create'
}

const actions = [
    {icon: <AddIcon/>, name: TemplateSpeedDialActionNames.CREATE},
    {
        icon: <DeleteForeverIcon color="warning" id="template-delete-speeddial-icon"/>,
        name: TemplateSpeedDialActionNames.DELETE
    },
];

export const TemplateSpeedDial = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const [openActions, setOpenActions] = useState(false);
    const [openTemplateCreationDialog, setOpenTemplateCreationDialog] = useState(false);
    const handleOpen = () => setOpenActions(true);
    const handleClose = () => setOpenActions(false);

    useEffect(() => {
        if (appMode === APP_MODE.TEMPLATE_DELETION) {
            setOpenActions(false);
        }
    }, [appMode])

    const onActionClick = (event: React.MouseEvent<HTMLDivElement>, actionName: string) => {
        event.stopPropagation();

        switch (actionName) {
            case TemplateSpeedDialActionNames.CREATE:
                setOpenTemplateCreationDialog(true);
                break;
            case TemplateSpeedDialActionNames.DELETE:
                if (appMode === APP_MODE.TEMPLATE_DELETION) {
                    dispatch(setAppMode(APP_MODE.DEFAULT));
                } else {
                    dispatch(setAppMode(APP_MODE.TEMPLATE_DELETION));
                }
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            {
                appMode !== APP_MODE.TEMPLATE_DELETION &&

                <SpeedDial
                    ariaLabel="SpeedDial templates"
                    icon={<SpeedDialIcon openIcon={<ExtensionIcon/>}/>}
                    onClose={handleClose}
                    onOpen={handleOpen}>
                    {actions.map((action) => (
                        <SpeedDialAction
                            sx={{height: openActions ? "auto" : 0}}
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipPlacement='right'
                            tooltipOpen
                            onClick={(event) => onActionClick(event, action.name)}
                        />
                    ))}
                </SpeedDial>

            }
            <TemplateCreationDialog open={openTemplateCreationDialog} setOpen={setOpenTemplateCreationDialog}/>
        </React.Fragment>
    );
}
