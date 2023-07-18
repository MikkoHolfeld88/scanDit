import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import "./style.css"

export interface AddTemplateMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    anchorEl: null | HTMLElement;
    setAnchorEl?: (anchorEl: null | HTMLElement) => void;
}

export function AddTemplateMenu(props: AddTemplateMenuProps) {
    const handleClose = () => {
        props.setOpen(false);
        props.setAnchorEl && props?.setAnchorEl(null);
    };

    return (
        <div>
            <Menu
                id="fade-menu"
                style={{marginTop: "5px"}}
                MenuListProps={{'aria-labelledby': 'fade-button',}}
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem onClick={handleClose} disableRipple>
                    <AddIcon className="add-template-icon"/>
                    Create
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <InsertDriveFileIcon className="add-template-icon"/>
                    Pick
                </MenuItem>
            </Menu>
        </div>
    );
}
