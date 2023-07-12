import {createTheme} from "@mui/material";

// export const primaryMain = '#3F72AF';
export const primaryMain = '#000000';
export const secondaryMain = '#9ebdee';
export const infoMain = '#F9F7F7'
export const darkMain = '#42a5f5'
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
                    fontSize: '13px',  // Ändern Sie die Schriftgröße nach Ihren Wünschen
                },
            },
        },
    },
});
