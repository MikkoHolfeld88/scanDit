import * as React from 'react';
import {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {ROUTE_PATHS} from "../../routing/routePaths";
import {useNavigate} from "react-router-dom";
import {menuItems} from "../../routing/menu-items";
import {auth} from "../../firebase/firebase";
import {brightMain, primaryMain} from "../../style/theme";
import {useSelector} from "react-redux";
import {selectAppMode} from "../../store/slices/appConfig/selectors";
import {AppMode} from "../../models/AppMode";
import {APP_MODE} from "../../enums/appMode.enum";
import {setAppMode} from "../../store/slices/appConfig/reducers";
import {useAppDispatch} from "../../store/store";

function Header() {
    const dispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userName, setUserName] = React.useState<string | null>('');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
                setLoggedIn(true);
            } else {
                setUserName(null);
                setLoggedIn(false);
            }
        });
    }, []);

    const handlePipelineDeletionMode = () => {
        if (appMode === APP_MODE.PIPELINE_DELETION) {
            dispatch(setAppMode(APP_MODE.DEFAULT));
        }
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        handlePipelineDeletionMode();
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleRerouteNavMenu = (route: string) => {
        handlePipelineDeletionMode();
        route !== ROUTE_PATHS.BACKDROP_CLICK && navigate(route);
        handleCloseNavMenu();
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        handlePipelineDeletionMode();
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleRerouteUserMenu = (route: string) => {
        handlePipelineDeletionMode();
        route !== ROUTE_PATHS.BACKDROP_CLICK && navigate(route);
        handleCloseUserMenu();
    }

    return (
        <AppBar position="sticky" style={{backgroundColor: brightMain, width: '100vw'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{display: {xs: 'none', md: 'flex'}, mr: 1, color: primaryMain}}
                        onClick={event => handleRerouteNavMenu(ROUTE_PATHS.HOME)}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: primaryMain,
                            textDecoration: 'none',
                        }}>
                        LOGO
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            style={{color: primaryMain}}
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'},}}>
                            {menuItems.main.map((menuItem) => (
                                <MenuItem key={menuItem.title} onClick={event => handleRerouteNavMenu(menuItem.path)}>
                                    <Typography
                                        textAlign="center"
                                        style={{color: primaryMain}}>
                                        {menuItem.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1, color: primaryMain}}/>

                    <Typography
                        variant="h5"
                        noWrap
                        href={ROUTE_PATHS.HOME}
                        component="a"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: primaryMain,
                            textDecoration: 'none',
                        }}>
                        ScanDit
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {menuItems.main.map((menuItem) => (
                            <Button key={menuItem.title}
                                    onClick={event => handleRerouteNavMenu(menuItem.path)}
                                    sx={{my: 2, color: primaryMain, display: 'block'}}>
                                {menuItem.title}
                            </Button>
                        ))}
                    </Box>

                    {
                        loggedIn &&
                        <Box sx={{flexGrow: 0}}>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt={userName ? userName : "user"} src="/static/images/avatar/2.jpg"/>
                            </IconButton>

                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                {menuItems.settings.map((setting) => (
                                    <MenuItem
                                        key={setting.title}
                                        onClick={event => handleRerouteUserMenu(setting.path)}>
                                        <Typography
                                            style={{color: primaryMain}}
                                            textAlign="center">
                                            {setting.title}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
