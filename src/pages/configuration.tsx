import React, {useEffect} from "react";
import {Divider, Tab, Tabs} from "@mui/material";
import ExtensionIcon from '@mui/icons-material/Extension';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import {useSelector} from "react-redux";
import {selectIsBottomBar} from "../store/slices/sidebar/selectors";
import SwipeableViews from 'react-swipeable-views';
import Box from "@mui/material/Box";
import {selectConfigurationTab} from "../store/slices/appConfig/selectors";
import {AppDispatch, useAppDispatch} from "../store/store";
import {setConfigurationTab} from "../store/slices/appConfig/reducers";
import {Pipelines} from "./pipelines";
import {CONFIGURATION_TAB_NAMES} from "../enums/configurationTabNames.enum";
import {Templates} from "./templates";
import {User} from "@firebase/auth";
import {auth} from "../firebase/firebase";
import {fetchPipelines} from "../store/slices/pipeline/thunks";
import {fetchTemplates} from "../store/slices/template/thunks";
import {Operations} from "./operations";
import {fetchOperations} from "../store/slices/operations/thunks";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{padding: 0, margin: 0}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export const Configuration = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const isBottomBar = useSelector(selectIsBottomBar);
    const configurationTab = useSelector(selectConfigurationTab);
    const USER: User | null = auth.currentUser;

    useEffect(() => {
        if (!USER?.uid) {
            console.error("Could not access user id. Aborted fetching pipeline & template data.")
        }

        if (USER?.uid) {
            dispatch(fetchPipelines(USER?.uid));
            dispatch(fetchTemplates(USER?.uid));
            dispatch(fetchOperations(USER?.uid));
        }
    }, [])

    const handleChange = (newValue: number) => {
        dispatch(setConfigurationTab(newValue));
    };

    return (
        <div id="configuration-content">
            <Tabs value={configurationTab} onChange={(event, newValue) => handleChange(newValue)}
                  centered={isBottomBar}>
                <Tab icon={<AccountTreeIcon fontSize="small"/>} label={CONFIGURATION_TAB_NAMES.PIPELINES}/>
                <Tab icon={<ExtensionIcon fontSize="small"/>} label={CONFIGURATION_TAB_NAMES.TEMPLATES}/>
                <Tab icon={<PrecisionManufacturingIcon fontSize="small"/>} label={CONFIGURATION_TAB_NAMES.OPERATIONS}/>
            </Tabs>

            <Divider/>

            <SwipeableViews index={configurationTab} onChangeIndex={handleChange}>
                <TabPanel value={configurationTab} index={0}>
                    <Pipelines/>
                </TabPanel>
                <TabPanel value={configurationTab} index={1}>
                    <Templates/>
                </TabPanel>
                <TabPanel value={configurationTab} index={2}>
                    <Operations/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
