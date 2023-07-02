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

function Header() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleRerouteNavMenu = (route: string) => {
        route !== ROUTE_PATHS.BACKDROP_CLICK && navigate(route);
        handleCloseNavMenu();
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleRerouteUserMenu = (route: string) => {
        route !== ROUTE_PATHS.BACKDROP_CLICK && navigate(route);
        handleCloseUserMenu();
    }

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}
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
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
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
                                    <Typography textAlign="center">{menuItem.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>

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
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        ScanDit
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {menuItems.main.map((menuItem) => (
                            <Button key={menuItem.title}
                                    onClick={event => handleRerouteNavMenu(menuItem.path)}
                                    sx={{my: 2, color: 'white', display: 'block'}}>
                                {menuItem.title}
                            </Button>
                        ))}
                    </Box>

                    {
                        loggedIn && <Box sx={{flexGrow: 0}}>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
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
                                    <MenuItem key={setting.title} onClick={event => handleRerouteUserMenu(setting.path)}>
                                        <Typography textAlign="center">{setting.title}</Typography>
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
