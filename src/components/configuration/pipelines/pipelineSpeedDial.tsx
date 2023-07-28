import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {APP_MODE} from "../../../enums/appMode.enum";
import {useAppDispatch} from "../../../store/store";
import {AppMode} from "../../../models/AppMode";
import {useSelector} from "react-redux";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import {setAppMode} from "../../../store/slices/appConfig/reducers";
import {Backdrop} from "@mui/material";
import {useEffect} from "react";
import {PipelineCreationDialog} from "./dialogs/pipelineCreationDialog";

enum PipelineSpeedDialActionNames {
    DELETE = 'Delete',
    CREATE = 'Create'
}

const actions = [
    {icon: <DeleteForeverIcon color="warning"/>, name: PipelineSpeedDialActionNames.DELETE},
    {icon: <AddIcon color="primary"/>, name: PipelineSpeedDialActionNames.CREATE},
];

export function PipelineSpeedDial() {
    const dispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const [openActions, setOpenActions] = React.useState(false);
    const [openPipelineCreationDialog, setOpenPipelineCreationDialog] = React.useState(false);
    const handleOpen = () => setOpenActions(true);
    const handleClose = () => setOpenActions(false);

    useEffect(() => {
        if (appMode === APP_MODE.PIPELINE_DELETION) {
            setOpenActions(false);
        }
    }, [appMode])

    const onActionClick = (actionName: string) => {
        switch (actionName) {
            case PipelineSpeedDialActionNames.DELETE: dispatch(setAppMode(APP_MODE.PIPELINE_DELETION)); break;
            case PipelineSpeedDialActionNames.CREATE: setOpenPipelineCreationDialog(true); break;
            default: break;
        }
    }

    return (
            <React.Fragment>
                {
                    appMode !== APP_MODE.PIPELINE_DELETION &&

                    <SpeedDial
                        ariaLabel="Pipeline creation Speed dial"
                        icon={<SpeedDialIcon/>}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={openActions}>
                        {actions.map((action) => (
                            <SpeedDialAction
                                sx={{height: openActions ? "auto" : 0}}
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                tooltipPlacement='right'
                                tooltipOpen
                                onClick={() => onActionClick(action.name)}
                            />
                        ))}
                    </SpeedDial>

                }
                <PipelineCreationDialog open={openPipelineCreationDialog} setOpen={setOpenPipelineCreationDialog} />
            </React.Fragment>
    );
}
