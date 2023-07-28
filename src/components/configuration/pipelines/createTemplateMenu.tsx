import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Collapse, ListItemIcon} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import {selectTemplates} from "../../../store/slices/template/selectors";
import {useSelector} from "react-redux";
import {Template} from "../../../models/Template";
import ExtensionIcon from "@mui/icons-material/Extension";
import {PuzzleIcon} from "../../../style/providePuzzleIcons";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

interface CreateTemplateMenuProps {
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    open: boolean;
    handleClose: () => void;
}

export const CreateTemplateMenu = (props: CreateTemplateMenuProps) => {
    const [open, setOpen] = React.useState(false);
    const templates: Template[] = useSelector(selectTemplates);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.handleClose}>
            <MenuItem onClick={props.handleClose} disableRipple>
                <AddIcon/>
                Create Template
            </MenuItem>
            <Divider sx={{my: 0.5}}/>
            <MenuItem onClick={handleClick} disableRipple>
                <FileCopyIcon/>
                <ListItemText primary="Choose Template"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </MenuItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {templates.map((template, index) => (
                        <ListItemButton key={template.id + "_" + index} sx={{pl: 4}}>
                            <ListItemIcon>
                                <PuzzleIcon />
                            </ListItemIcon>
                            <ListItemText primary={template.name}/>
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </StyledMenu>
    );
}
