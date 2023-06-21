import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {LoginRounded} from "@mui/icons-material";

interface ISidebarEntryProps {
    onClick : () => any;
    index?: number;
    text: string;
    icon?: JSX.Element;
    path: string;
}

export const SidebarEntry = (props: ISidebarEntryProps) => {
    const sideBarOpen = useSelector ((state: RootState) => state.sidebar.open);

    return (
        <ListItem key={props.text} disablePadding sx={{display: 'block'}}>
            <ListItemButton
                onClick={props.onClick}
                sx={{
                    minHeight: 48,
                    justifyContent: sideBarOpen ? 'initial' : 'center',
                    px: 2.5,
                }}>
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: sideBarOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}>
                    {
                        props.icon ? props.icon : <LoginRounded />
                    }
                </ListItemIcon>
                <ListItemText
                    primary={props.text}
                    sx={{
                        color: "black",
                        opacity: sideBarOpen ? 1 : 0
                }}/>
            </ListItemButton>
        </ListItem>
    )
};
