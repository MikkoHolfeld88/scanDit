import {Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {File} from "../../models/File";
import {updateFilenameInDatabase} from "../../services/realtimeDatabaseService";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./style.css"

export interface IImageDialogProps {
    file: File | null;
    open: boolean;
    setOpen: (visible: boolean) => void;
}

export const ListDialog = (props: IImageDialogProps) => {
    const [filename, setFilename] = useState<string>("");

    useEffect(() => {
        setFilename(props.file?.filename || "untitled");
    }, [props.file]);

    useEffect(() => {
        if (filename === "") setFilename(props.file?.filename || "untitled");
    }, [filename]);

    const handleAnalyse = () => {
        console.log("Analyse");
    }

    const updateFilename = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilename(e.target.value);
    }

    const handleSubmit = () => {
        if (props.file && filename !== props.file.filename && filename !== "") {
            updateFilenameInDatabase(props.file.id, filename);
        }
    }

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth="xl" fullWidth>
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">Edit File</Typography>
                    <IconButton edge="end" color="inherit" onClick={() => { handleSubmit(); props.setOpen(false); }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className="dialog-content">
                <TextField variant="standard" label="Filename" onChange={updateFilename} value={filename} fullWidth/>
                <Divider />
                <TextField variant="standard" label="Filetype" onChange={updateFilename} disabled value={props.file?.filetype} fullWidth/>
                <Divider />
                <TextField variant="standard" label="Uploaded" onChange={updateFilename} disabled value={props.file?.uploaded} fullWidth/>
                <Divider />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" autoFocus onClick={() => { handleSubmit(); props.setOpen(false); }}>
                    {props.file?.filename === filename || filename === "" ? "Close" : "Update"}
                </Button>
                <Button variant="outlined" onClick={handleAnalyse}>
                    Create Input Template
                </Button>
            </DialogActions>
        </Dialog>
    )
}
