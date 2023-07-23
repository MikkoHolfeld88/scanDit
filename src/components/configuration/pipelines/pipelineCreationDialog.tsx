import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {getAuth} from "firebase/auth";
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from "@mui/material/Typography";
import {IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface PipelineCreationDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const PipelineCreationDialog = (props: PipelineCreationDialogProps) => {
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [author, setAuthor] = React.useState<string>(    getAuth().currentUser?.displayName || "");
    const [icon, setIcon] = React.useState<string>("");

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">Create pipeline</Typography>
                    <IconButton edge="end" color="inherit" onClick={() => {props.setOpen(false);}}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField
                    sx={{mb: 1, mt: 1}}
                    variant="outlined"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    fullWidth/>
                <TextField
                    sx={{mb: 1, mt: 1}}
                    variant="outlined"
                    label="Author"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    fullWidth/>
                <TextField
                    sx={{mb: 1, mt: 1}}
                    variant="outlined"
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    multiline
                    rows={4}
                    fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} startIcon={<CancelIcon />} variant="outlined">Cancel</Button>
                <Button onClick={handleClose} startIcon={<AddIcon />} variant="outlined">Create</Button>
            </DialogActions>
        </Dialog>
    );
}
