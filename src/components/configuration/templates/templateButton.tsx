import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareIcon from "@mui/icons-material/Share";
import {styled} from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledSpeedDial = styled(SpeedDial)(({theme}) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(0),
        right: theme.spacing(2),
        top: theme.spacing(2)
    },
}));

enum TemplateSpeedDialActionNames {
    SHARE = 'Share',
    DELETE = 'Delete',
    CREATE = 'Create'
}

const actions = [
    {icon: <DeleteIcon color="warning"/>, name: TemplateSpeedDialActionNames.DELETE},
    {icon: <ShareIcon/>, name: TemplateSpeedDialActionNames.SHARE},
    {icon: <AddIcon/>, name: TemplateSpeedDialActionNames.CREATE},
];

export const TemplateButton = () => {
    return (
        <StyledSpeedDial
            ariaLabel="SpeedDial templates"
            icon={<SpeedDialIcon/>}
            direction={"left"}>
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                />
            ))}
        </StyledSpeedDial>
    );
}
