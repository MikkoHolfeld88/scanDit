import React from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Menu, MenuItem, Sidebar} from 'react-pro-sidebar';
import {menuItems} from "../routing/menu-items";
import {BottomNavigation, BottomNavigationAction, Divider, Paper} from "@mui/material";
import {brightMain, primaryMain} from "../style/theme";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../store/store";
import {selectIsBottomBar, selectIsOpen} from "../store/slices/sidebar/selectors";
import {setIsOpen} from "../store/slices/sidebar/reducers";
import "./style.css"

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const sidebarIsOpen = useSelector(selectIsOpen);
    const isBottomBar = useSelector(selectIsBottomBar);
    const [value, setValue] = React.useState('Upload');

    const handleBottomNavigation = (event: React.SyntheticEvent, newValue: string) => {
        const path: string = menuItems.dashboard.find(item => item.title === newValue)?.path as string;
        setValue(newValue);
        navigate(path);
    };

    return (
        <div className={isBottomBar ? "bottombar" : "sidebar"}>
            {
                !isBottomBar &&
                <Sidebar collapsed={!sidebarIsOpen} backgroundColor={brightMain} >
                    <Menu>
                        <MenuItem
                            onClick={() => dispatch(setIsOpen(!sidebarIsOpen))}
                            icon={<i className={!sidebarIsOpen ? "pi pi-angle-double-right" : "pi pi-angle-double-left"} style={{color: primaryMain}}>
                            </i>}>
                        </MenuItem>

                        <Divider/>

                        {
                            menuItems.dashboard.map((item, index) => {
                                if (!sidebarIsOpen) {
                                    return (
                                        <Link to={item.path} key={index} className="link">
                                            <MenuItem key={index} icon={
                                                <i className={item.icon} style={{color: primaryMain}}></i>}>
                                            </MenuItem>
                                        </Link>
                                    )
                                }

                                return (
                                    <Link to={item.path} key={index} className="link">
                                        <MenuItem key={index} icon={
                                            <i className={item.icon}
                                               style={{color: primaryMain}}>
                                            </i>}>
                                            {item.title}
                                        </MenuItem>
                                    </Link>
                                )
                            })
                        }
                    </Menu>
                </Sidebar>
            }

            <main className="dashboard-content">
                <Outlet/>
            </main>

            {
                isBottomBar &&
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleBottomNavigation}>
                    {
                        menuItems.dashboard.map((item, index) => {
                            return (
                                <BottomNavigationAction
                                    style={{color: primaryMain}}
                                    value={item.title}
                                    label={item.title}
                                    icon={<i className={item.icon}></i>}>
                                </BottomNavigationAction>
                            )
                        })
                    }

                </BottomNavigation>
                </Paper>
            }
        </div>
    );
}
