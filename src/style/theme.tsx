import {createTheme} from "@mui/material";

export const primaryMain = '#000000';
export const warnSuperLight = '#ffdfc8';
export const warnLight = '#ff9800';
export const warnMain = '#ed6c02';
export const warnDark = '#e65100';
export const warnSuperDark = '#c02d00';
export const primaryGrey = 'rgba(0, 0, 0, .03)'
export const secondaryMain = 'rgba(205,211,220,0.66)';
export const secondaryContrastText = '#ffffff';
export const infoMain = '#F9F7F7'
export const darkMain = '#5d5d5d'

export const MUITheme = createTheme({
    palette: {
        primary: {
            main: primaryMain,
        },
        secondary: {
            contrastText: secondaryContrastText,
            main: secondaryMain,
        },
        info: {
            main: infoMain,
        },
        warning: {
            main: warnMain,
            light: warnLight,
            dark: warnDark
        }

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
