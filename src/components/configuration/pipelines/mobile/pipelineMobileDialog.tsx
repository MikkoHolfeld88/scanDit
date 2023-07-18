import {Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {Pipeline} from "../../../../models/Pipeline";
import {TemplateMobileCard} from "./templateMobileCard";
import "./style.css"

export interface IPipelineMobileDialogProps {
    pipeline: Pipeline;
    open: boolean;
    setOpen: (visible: boolean) => void;
}

export const PipelineMobileDialog = (props: IPipelineMobileDialogProps) => {
    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth="xl" fullWidth >
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">{props.pipeline.name}</Typography>
                    <IconButton edge="end" color="inherit" onClick={() => {
                        props.setOpen(false);
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className="dialog-content">

                <TemplateMobileCard/>

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" autoFocus onClick={() => {
                    props.setOpen(false);
                }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
