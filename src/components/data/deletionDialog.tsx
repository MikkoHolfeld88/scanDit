import {Dialog, DialogActions, DialogTitle, IconButton} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import {File, isValidFile} from "../../models/File";
import {deleteFileFromDatabase, moveToDeletedFiles} from "../../services/realtimeDatabaseService";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./style.css"

export interface IDeletionDialogProps {
    file: File | null;
    open: boolean;
    setOpen: (visible: boolean) => void;
}

export const DeletionDialog = (props: IDeletionDialogProps) => {
    const handleDeletion = () => {
        deleteFileFromDatabase(props?.file?.id);
        props.setOpen(false);
    }

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth="xl" fullWidth>
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="body1">Really delete <b>{props.file?.filename}</b>?</Typography>
                    <IconButton edge="end" color="inherit" onClick={() => {
                        props.setOpen(false);
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogActions>
                <Button variant="outlined" onClick={handleDeletion} color="warning">
                    Delete
                </Button>
                <Button variant="outlined" autoFocus onClick={() => {
                    props.setOpen(false);
                }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
