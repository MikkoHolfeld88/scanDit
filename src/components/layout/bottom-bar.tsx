import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {menuItems} from "../../routing/menu-items";
import {primaryMain} from "../../style/theme";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {ROUTE_PATHS} from "../../routing/routePaths";
import {useSelector} from "react-redux";
import {selectAppMode, selectConfigurationTabNames} from "../../store/slices/appConfig/selectors";
import {CONFIGURATION_TAB_NAMES} from "../../enums/configurationTabNames.enum";
import {PipelineSpeedDial} from "../configuration/pipelines/pipelineSpeedDial";
import {AppMode} from "../../models/AppMode";
import {APP_MODE} from "../../enums/appMode.enum";

interface BottomBarProps {
    value: string;
    handleBottomNavigation: (event: React.SyntheticEvent, newValue: string) => void;
}

export const BottomBar = (props: BottomBarProps) => {
    const location = useLocation();
    const appMode: AppMode = useSelector(selectAppMode);
    const currentTab = useSelector(selectConfigurationTabNames);

    /**
     * Returns true if the current page is the configuration page of the dashboard
     * and the tab "Pipelines" is selected.
     */
    const onConfigurationPipelinesPage = () => {
        return location.pathname === ROUTE_PATHS.DASHBOARD + "/" + ROUTE_PATHS.CONFIGURATION
            && currentTab === CONFIGURATION_TAB_NAMES.PIPELINES;
    }

    return (
        <div style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
            {
                onConfigurationPipelinesPage() &&
                <PipelineSpeedDial />
            }
            <br/>
            <Paper  elevation={3}>
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
