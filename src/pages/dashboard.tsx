import React from "react";
import {Link, Outlet} from "react-router-dom";
import {Menu, MenuItem, Sidebar} from 'react-pro-sidebar';
import {menuItems} from "../routing/menu-items";
import {Divider} from "@mui/material";
import {brightMain, primaryMain} from "../style/theme";
import "./style.css"

export const Dashboard = () => {
    const [collapsed, setCollapsed] = React.useState(true);

    return (
        <div className="sidebar">
            <Sidebar collapsed={collapsed} backgroundColor={brightMain} >
                <Menu>
                    <MenuItem
                        onClick={() => setCollapsed(!collapsed)}
                        icon={<i className={collapsed ? "pi pi-angle-double-right" : "pi pi-angle-double-left"} style={{color: primaryMain}}>
                        </i>}>
                    </MenuItem>

                    <Divider/>

                    {
                        menuItems.dashboard.map((item, index) => {
                            if (collapsed) {
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
                                    <MenuItem key={index} icon={<i className={item.icon} style={{color: primaryMain}}></i>}>{item.title}</MenuItem>
                                </Link>
                            )
                        })
                    }
                </Menu>
            </Sidebar>

            <main className="dashboard-content">
                <Outlet/>
            </main>

        </div>
    );
}
