import {createTheme} from "@mui/material";

export const primaryMain = '#000000';
export const primaryGrey = 'rgba(0, 0, 0, .03)'
export const secondaryMain = 'rgba(205,211,220,0.66)';
export const infoMain = '#F9F7F7'
export const darkMain = '#5d5d5d'
export const brightMain = '#ffffff';

export const MUITheme = createTheme({
    palette: {
        primary: {
            main: primaryMain,
        },
        secondary: {
            contrastText: brightMain,
            main: secondaryMain,
        },
        info: {
            main: infoMain,
        },

    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: '13px',
                },
            },
        },
    },
});
