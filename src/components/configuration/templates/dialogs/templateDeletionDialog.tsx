import {Dialog, DialogActions, DialogTitle, IconButton} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "../style.css"

export interface TemplateDeletionDialogProps {
    handleDeletion: () => void;
    templateId: string;
    templateName: string;
    open: boolean;
    setOpen: (visible: boolean) => void;
}

export const TemplateDeletionDialog = (props: TemplateDeletionDialogProps) => {
    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth="xl" fullWidth>
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="body1">Really delete <b>{props.templateName}</b>?</Typography>
                    <IconButton edge="end" color="inherit" onClick={() => {
                        props.setOpen(false);
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogActions>
                <Button variant="outlined" autoFocus onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={() => props.handleDeletion()} color="warning">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
