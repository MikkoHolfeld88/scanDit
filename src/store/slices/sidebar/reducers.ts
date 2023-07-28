import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SideBarState} from "./types";

const initialState: SideBarState = {
    isOpen: false,
    isBottomBar: true
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setIsBottomBar(state, action: PayloadAction<boolean>) {
            state.isBottomBar = action.payload;
        }
    },
});

export const {setIsOpen, setIsBottomBar} = sidebarSlice.actions;

export default sidebarSlice.reducer;
