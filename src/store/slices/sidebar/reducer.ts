import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SideBarState} from "./types";

const initialState: SideBarState = {
    isOpen: false,
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
});

export const {setIsOpen} = sidebarSlice.actions;

export default sidebarSlice.reducer;
