import React, {useState} from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {styled} from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {setAppMode} from "../../../store/slices/appConfig/reducers";
import {APP_MODE} from "../../../enums/appMode.enum";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {TemplateCreationDialog} from "./dialogs/templateCreationDialog";
import {useSelector} from "react-redux";
import {AppMode} from "../../../models/AppMode";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";

const StyledSpeedDial = styled(SpeedDial)(({theme}) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(0),
        right: theme.spacing(2),
        top: theme.spacing(2)
    },
}));

enum TemplateSpeedDialActionNames {
    DELETE = 'Delete',
    CREATE = 'Create'
}

const actions = [
    {icon: <AddIcon/>, name: TemplateSpeedDialActionNames.CREATE},
    {icon: <DeleteForeverIcon color="warning" id="template-delete-speeddial-icon"/>, name: TemplateSpeedDialActionNames.DELETE},
];

export const TemplateButton = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const [openTemplateCreationDialog, setOpenTemplateCreationDialog] = useState(false);

    const onActionClick = (event: React.MouseEvent<HTMLDivElement>, actionName: string) => {
        event.stopPropagation();

        switch (actionName) {
            case TemplateSpeedDialActionNames.CREATE: setOpenTemplateCreationDialog(true); break;
            case TemplateSpeedDialActionNames.DELETE:
                if (appMode === APP_MODE.TEMPLATE_DELETION) {
                    dispatch(setAppMode(APP_MODE.DEFAULT));
                } else {
                    dispatch(setAppMode(APP_MODE.TEMPLATE_DELETION));
                }
                break;
            default: break;
        }
    }

    return (
        <React.Fragment>
            <StyledSpeedDial
                ariaLabel="SpeedDial templates"
                icon={<SpeedDialIcon/>}
                direction={"left"}>
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        onClick={(event) => onActionClick(event, action.name)}
                    />
                ))}
            </StyledSpeedDial>
            <TemplateCreationDialog open={openTemplateCreationDialog} setOpen={setOpenTemplateCreationDialog} />
        </React.Fragment>
    );
}
