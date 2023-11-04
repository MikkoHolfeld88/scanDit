import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {menuItems} from "../../routing/menu-items";
import {primaryMain} from "../../style/theme";
import React from "react";

interface BottomBarProps {
    value: string;
    handleBottomNavigation: (event: React.SyntheticEvent, newValue: string) => void;
}

export const BottomBar = (props: BottomBarProps) => {
    return (
        <div style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
            <Paper elevation={3}>
                <BottomNavigation
                    showLabels
                    value={props.value}
                    onChange={props.handleBottomNavigation}>
                    {
                        menuItems.dashboard.map((item) => {
                            return (
                                <BottomNavigationAction
                                    key={item.title}
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
        </div>

    )
}
