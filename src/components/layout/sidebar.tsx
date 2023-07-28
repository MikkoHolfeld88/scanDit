import {brightMain, primaryMain} from "../../style/theme";
import {Menu, MenuItem, Sidebar as ReactProSidebar} from "react-pro-sidebar";
import {setIsOpen} from "../../store/slices/sidebar/reducers";
import {Divider} from "@mui/material";
import {menuItems} from "../../routing/menu-items";
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {selectIsOpen} from "../../store/slices/sidebar/selectors";
import {useAppDispatch} from "../../store/store";

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const sidebarIsOpen = useSelector(selectIsOpen);

    return (
        <ReactProSidebar collapsed={!sidebarIsOpen} backgroundColor={brightMain} >
            <Menu>
                <MenuItem
                    onClick={() => dispatch(setIsOpen(!sidebarIsOpen))}
                    icon={<i className={!sidebarIsOpen ? "pi pi-angle-double-right" : "pi pi-angle-double-left"} style={{color: primaryMain}}></i>}>
                </MenuItem>

                <Divider/>

                {
                    menuItems.dashboard.map((item, index) => {
                        const iconElement = <i className={item.icon} style={{color: primaryMain}}></i>;
                        const menuItemContent = !sidebarIsOpen ? null : item.title;

                        return (
                            <Link to={item.path} key={index} className="link">
                                <MenuItem key={index} icon={iconElement}>
                                    {menuItemContent}
                                </MenuItem>
                            </Link>
                        );
                    })
                }
            </Menu>
        </ReactProSidebar>
    )
}

