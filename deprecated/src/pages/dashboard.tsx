import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {menuItems} from "../routing/menu-items";
import {useSelector} from "react-redux";
import {selectIsBottomBar} from "../store/slices/sidebar/selectors";
import "./style.css"
import {BottomBar} from "../components/layout/bottom-bar";
import {Sidebar} from "../components/layout/sidebar";

export const Dashboard = () => {
    const navigate = useNavigate();
    const isBottomBar = useSelector(selectIsBottomBar);
    const [value, setValue] = React.useState('Upload');

    const dashboardContentStyle = isBottomBar ? {paddingBottom: '56px'} : {};

    const handleBottomNavigation = (event: React.SyntheticEvent, newValue: string) => {
        const path: string = menuItems.dashboard.find(item => item.title === newValue)?.path as string;
        setValue(newValue);
        navigate(path);
    };

    return (
        <div className={isBottomBar ? "bottombar" : "sidebar"}>
            {
                !isBottomBar &&
                <Sidebar/>
            }

            <main className="dashboard-content" style={dashboardContentStyle}>
                <Outlet/>
            </main>

            {
                isBottomBar && <BottomBar value={value} handleBottomNavigation={handleBottomNavigation}/>
            }
        </div>
    );
}
