import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useSelector} from "react-redux";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {TemplateSortingType} from "../../../models/TemplateSortingType";
import {setTemplateSorting} from "../../../store/slices/appConfig/reducers";
import {TEMPLATE_SORTING} from "../../../enums/teplateSorting.enum";
import AbcIcon from '@mui/icons-material/Abc';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {selectTemplateSorting} from "../../../store/slices/appConfig/selectors";

export const TemplateSorter = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const templateSorting: TemplateSortingType = useSelector(selectTemplateSorting);

    const getReverseSort = (currentSorting: TemplateSortingType): TemplateSortingType => {
        switch (currentSorting) {
            case TEMPLATE_SORTING.ALPHABETICALLY:
                return TEMPLATE_SORTING.ALPHABETICALLY_REVERSE;
            case TEMPLATE_SORTING.BY_DATE:
                return TEMPLATE_SORTING.BY_DATE_REVERSE;
            case TEMPLATE_SORTING.BY_TYPE:
                return TEMPLATE_SORTING.BY_TYPE_REVERSE;
            case TEMPLATE_SORTING.ALPHABETICALLY_REVERSE:
                return TEMPLATE_SORTING.ALPHABETICALLY;
            case TEMPLATE_SORTING.BY_DATE_REVERSE:
                return TEMPLATE_SORTING.BY_DATE;
            case TEMPLATE_SORTING.BY_TYPE_REVERSE:
                return TEMPLATE_SORTING.BY_TYPE;
            default:
                return TEMPLATE_SORTING.ALPHABETICALLY;
        }
    }

    /**
     * Handles the selection of a new template sorting mode.
     *
     * This function dispatches a new template sorting action with either the
     * newly selected sorting mode or its reverse, if the selected mode is
     * the same as the current one. The aim is to allow the user to switch
     * between ascending and descending sort order by clicking the same
     * toggle button twice.
     *
     * @param event - The triggering mouse event
     * @param newTemplateSorting - The selected sorting mode
     */
    const handleTemplateSorting = (event: React.MouseEvent<HTMLElement>, newTemplateSorting: TemplateSortingType) => {
        if (newTemplateSorting === null) {
            dispatch(setTemplateSorting(getReverseSort(templateSorting)));
        } else {
            if (newTemplateSorting === templateSorting) {
                dispatch(setTemplateSorting(getReverseSort(newTemplateSorting)));
            } else {
                dispatch(setTemplateSorting(newTemplateSorting));
            }
        }
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
