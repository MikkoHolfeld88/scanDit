import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {truncateFilename} from "../../style/displayFunctions/truncateFilename";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export interface IImageDialogProps {
    imageName: string;
    imageUrl: string;
    open: boolean;
    setOpen: (visible: boolean) => void;
}

export const ImageDialog = (props: IImageDialogProps) => {
    const handleAnalyse = () => {
        console.log("Analyse");
    }

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} fullWidth>
            <DialogTitle>
                {truncateFilename(props.imageName, 10)}
            </DialogTitle>
            <DialogContent dividers>
                <TransformWrapper>
                    <TransformComponent>
                        <img src={props.imageUrl} style={{maxWidth: "100%"}}/>
                    </TransformComponent>
                </TransformWrapper>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" autoFocus onClick={() => props.setOpen(false)}>
                    Close
                </Button>
                <Button variant="outlined" onClick={handleAnalyse}>
                    Analyze
                </Button>
            </DialogActions>
        </Dialog>
    )
}
