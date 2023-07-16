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
    updatePipeline: (id: string, newName: string | undefined, newDescription: string | undefined) => void; // Funktion zur Aktualisierung beider, des Namens und der Beschreibung
}

export const PipelineMobileDialog = (props: IPipelineMobileDialogProps) => {
    const [editNameMode, setEditNameMode] = useState(false);
    const [editDescriptionMode, setEditDescriptionMode] = useState(false);
    const [tempName, setTempName] = useState(props.pipeline.name);
    const [tempDescription, setTempDescription] = useState(props.pipeline.description);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempDescription(event.target.value);
    };

    const handleUpdate = () => {
        props.updatePipeline(props.pipeline.id, tempName, tempDescription);
        setEditNameMode(false);
        setEditDescriptionMode(false);
    };

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth="xl" fullWidth >
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {editNameMode ? (
                        <TextField value={tempName} onChange={handleNameChange} onBlur={handleUpdate} autoFocus/>
                    ) : (
                        <Typography variant="h6"
                                    onClick={() => setEditNameMode(true)}>{props.pipeline.name}</Typography>
                    )}
                    <IconButton edge="end" color="inherit" onClick={() => {
                        props.setOpen(false);
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className="dialog-content">
                <div className="dialog-content-description">
                    {editDescriptionMode ? (
                        <TextField
                            value={tempDescription}
                            onChange={handleDescriptionChange}
                            onBlur={handleUpdate}
                            autoFocus
                            multiline // Unterstützung für mehrere Zeilen
                            fullWidth // Die volle Breite des Dialogs ausnutzen
                        />
                    ) : (
                        <Typography variant="body1"
                                    onClick={() => setEditDescriptionMode(true)}>{props.pipeline.description}</Typography>
                    )}
                </div>

                <Divider />
                <TemplateMobileCard/>
                <Divider />

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
