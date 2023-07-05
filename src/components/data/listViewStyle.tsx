import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {LIST_VIEW_STYLES} from "../../enums/listViewStyles.enum";
import {useSelector} from "react-redux";
import {setListViewStyle} from "../../store/slices/appConfig/reducers";
import {useAppDispatch} from "../../store/store";
import {ListViewStylesType} from "../../store/slices/appConfig/types";

export default function ListViewStyle() {
    const dispatch = useAppDispatch();
    const viewStyle = useSelector((state: any) => state.appConfig.listViewStyle);

    const handleViewStyle = (event: React.MouseEvent<HTMLElement>, newViewStyle: ListViewStylesType) => {
        dispatch(setListViewStyle(newViewStyle));
    };

    return (
        <ToggleButtonGroup value={viewStyle} exclusive onChange={handleViewStyle}>
            <ToggleButton value={LIST_VIEW_STYLES.TABLE}>
                <TableRowsIcon/>
            </ToggleButton>
            <ToggleButton value={LIST_VIEW_STYLES.LIST}>
                <ViewListIcon/>
            </ToggleButton>
            <ToggleButton value={LIST_VIEW_STYLES.FREE}>
                <ViewQuiltIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
