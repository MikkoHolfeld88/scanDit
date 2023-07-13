import {RootState} from "../../store";

export const selectIsOpen = (state: RootState) => state.sidebar.isOpen;
export const selectIsBottomBar = (state: RootState) => state.sidebar.isBottomBar;
export const selectIsTabletOrGreater = (state: RootState) => state.sidebar.isOpen;
