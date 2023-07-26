import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../store/store";
import {TemplateSortingType} from "../../../models/TemplateSortingType";
import {setTemplateSorting} from "../../../store/slices/appConfig/reducers";
import {TEMPLATE_SORTING} from "../../../enums/teplateSorting.enum";
import AbcIcon from '@mui/icons-material/Abc';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {selectTemplateSorting} from "../../../store/slices/appConfig/selectors";

export const TemplateSorter = () => {
    const dispatch = useAppDispatch();
    const templateSorting = useSelector(selectTemplateSorting);

    const handleTemplateSorting = (event: React.MouseEvent<HTMLElement>, newTemplateSorting: TemplateSortingType) => {
        if (newTemplateSorting === null) return;
        dispatch(setTemplateSorting(newTemplateSorting));
    };

    return (
        <ToggleButtonGroup value={templateSorting} exclusive onChange={handleTemplateSorting}>
            <ToggleButton value={TEMPLATE_SORTING.ALPHABETICALLY}>
                <AbcIcon/>
            </ToggleButton>
            <ToggleButton value={TEMPLATE_SORTING.BY_TYPE}>
                <CategoryIcon/>
            </ToggleButton>
            <ToggleButton value={TEMPLATE_SORTING.BY_DATE}>
                <CalendarMonthIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
