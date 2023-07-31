import * as React from 'react';
import {useEffect} from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {APP_MODE} from "../../../enums/appMode.enum";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {AppMode} from "../../../models/AppMode";
import {useSelector} from "react-redux";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import {setAppMode} from "../../../store/slices/appConfig/reducers";
import {OperationCreationDialog} from "./dialogs/operationCreationDialog";

enum OperationSpeedDialActionNames {
    DELETE = 'Delete',
    CREATE = 'Create'
}

export enum OperationSpeedDialActionIds {
    DELETE = 'operations-delete-speeddial-icon',
    CREATE = 'operations-create-speeddial-icon'
}

const actions = [
    {
        icon: <DeleteForeverIcon color="warning" id="operations-deletion-speeddial-icon"/>,
        name: OperationSpeedDialActionNames.DELETE,
    },
    {
        icon: <AddIcon color="primary"/>,
        name: OperationSpeedDialActionNames.CREATE,
    },
];

export function OperationsSpeedDial() {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const [openActions, setOpenActions] = React.useState(false);
    const [openOperationCreationDialog, setOpenOperationCreationDialog] = React.useState(false);
    const handleOpen = () => setOpenActions(true);
    const handleClose = () => setOpenActions(false);

    useEffect(() => {
        if (appMode === APP_MODE.OPERATIONS_DELETION) {
            setOpenActions(false);
        }
    }, [appMode])

    const onActionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, actionName: string) => {
        switch (actionName) {
            case OperationSpeedDialActionNames.DELETE:
                event.stopPropagation();
                dispatch(setAppMode(APP_MODE.OPERATIONS_DELETION));
                break;
            case OperationSpeedDialActionNames.CREATE:
                setOpenOperationCreationDialog(true);
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            {
                appMode !== APP_MODE.OPERATIONS_DELETION &&

                <SpeedDial
                    ariaLabel="Operations creation Speed dial"
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
                            onClick={(e) => onActionClick(e, action.name)}
                        />
                    ))}
                </SpeedDial>

            }
            <OperationCreationDialog open={openOperationCreationDialog} setOpen={setOpenOperationCreationDialog}/>
        </React.Fragment>
    );
}
