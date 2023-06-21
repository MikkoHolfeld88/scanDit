import * as React from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Grid} from "@mui/material";
import {SidebarEntry} from "./SidebarEntry";

import {BrowserRouter, useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../store/store";
import {setOpen} from "../store/slices/sidebar";
import {useSelector} from "react-redux";
import { ROUTE_PATHS} from "../routing/routePaths";
import {DashboardRoutes} from "../routing/dashboardroutes";

const drawerWidth = 180;

const style = {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100vh",
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open'})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const sideBarOpen = useSelector((state: RootState) => state.sidebar.open);

    const handleDrawerOpen = () => {
        dispatch(setOpen(true));
    };

    const handleDrawerClose = () => {
        dispatch(setOpen(false));
    };

    return (
        <Box sx={{display: 'flex', margin: 0, padding: 0}}>
            <AppBar position="fixed" open={sideBarOpen} color="secondary">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{marginRight: 5, ...(sideBarOpen && {display: 'none'})}}>
                        <MenuIcon/>
                    </IconButton>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h6" noWrap component="div"> Test </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={sideBarOpen}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>

                <Divider/>

                <List>
                    {
                        <SidebarEntry
                            key={"test"}
                            onClick={() => navigate(ROUTE_PATHS.UPLOAD)}
                            path={ROUTE_PATHS.UPLOAD}
                            text={"test"}/>
                    }
                </List>
            </Drawer>

            <Box component="main" style={{
                backgroundColor: style.backgroundColor,
                width: style.width,
                height: style.height,
            }}>
                <DrawerHeader/>
                <DashboardRoutes />
            </Box>
        </Box>
    );
}
