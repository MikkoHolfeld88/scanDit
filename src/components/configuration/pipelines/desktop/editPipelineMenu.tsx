import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

export interface EditPipelineMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    anchorEl: null | HTMLElement;
    setAnchorEl?: (anchorEl: null | HTMLElement) => void;
}

export function EditPipelineMenu(props: EditPipelineMenuProps) {
    const handleClose = () => {
        props.setOpen(false);
        props.setAnchorEl && props?.setAnchorEl(null);
    };

    return (
        <div>
            <Menu
                id="edit-pipeline-menu"
                style={{marginTop: "5px"}}
                MenuListProps={{'aria-labelledby': 'fade-button',}}
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon className="add-template-icon"/>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <ZoomOutMapIcon className="add-template-icon"/>
                    Move
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <DeleteIcon className="add-template-icon"/>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}
