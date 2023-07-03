import React from "react";
import {Alert, AlertColor, Snackbar} from "@mui/material";

export interface PopUpMessageProps {
    title?: string,
    message: string,
    open: boolean,
    setOpen: (show: boolean) => void,
    autoHideDuration?: number,
    severity?: AlertColor,
    action?: boolean,
    duration?: number,
}

export const PopUpMessage = (props: PopUpMessageProps) => {
    return (
        <Snackbar
            open={props?.open ? props.open : false}
            autoHideDuration={props.autoHideDuration ? props.autoHideDuration : 5000}
            onClose={() => props.setOpen(false)}
            message={props.message}
            action={props?.action ? props.action : false}>
            <Alert
                onClose={() => props.setOpen(false)}
                severity={props?.severity ? props.severity : 'info'}
                sx={{width: '100%'}}>
                {props?.message}
            </Alert>
        </Snackbar>
    );
}

