import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SideBarState {
    open: boolean;
}

const initialState: SideBarState = {
    open: false,
}

export const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
    },
});

export const {setOpen} = sideBarSlice.actions;
export default sideBarSlice.reducer;
