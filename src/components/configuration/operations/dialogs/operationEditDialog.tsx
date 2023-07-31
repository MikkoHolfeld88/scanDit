import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {getAuth} from "firebase/auth";
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from "@mui/material/Typography";
import {IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {RootState, useAppDispatch} from "../../../../store/store";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {OperationDeletionDialog} from "./operationDeletionDialog";
import {selectOperationById} from "../../../../store/slices/operations/selectors";
import {Operation} from "../../../../models/Operation";
import {deleteOperation, editOperation} from "../../../../store/slices/operations/reducers";
import {Transition} from "../../pipelines/dialogs/pipelineCreationDialog";

interface OperationEditionDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    operationId: string;
}

export const OperationEditDialog = (props: OperationEditionDialogProps) => {
    const dispatch = useAppDispatch();
    const operation: Operation | undefined = useSelector((state: RootState) => selectOperationById(state, props.operationId));
    const [openOperationDeletionDialog, setOpenOperationDeletionDialog] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [author, setAuthor] = React.useState<string>("");
    const [icon, setIcon] = React.useState<string>("");

    useEffect(() => {
        if (operation) {
            setName(operation.name);
            setDescription(operation.description || description);
            setAuthor(operation.author || getAuth().currentUser?.displayName || author);
            setIcon(operation.icon || icon);
        }
    }, [operation]);

    const handleUpdate = () => {
        if (name === "" || name === null || !operation?.id || !operation.created) {
            return;
        }

        const editedOperation: Operation = {
            operator: operation.operator,
            type: operation.type,
            id: operation.id,
            name: name,
            description: description ? description : undefined,
            created: operation.created,
            updated: new Date().toISOString(),
            author: author ? author : undefined,
            icon: icon ? icon : undefined
        }

        dispatch(editOperation(editedOperation));
        handleClose();
    };

    const handleDeletion = () => {
        if (operation && operation.id) {
            dispatch(deleteOperation(operation?.id));
            setOpenOperationDeletionDialog(false);
            handleClose();
        }
    }

    const clearLocalStates = () => {
        setName("");
        setDescription("");
        setAuthor("");
        setIcon("");
    }

    const handleClose = () => {
        clearLocalStates();
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
                    <Typography variant="h6">Edit operation</Typography>
                    <IconButton edge="end" color="inherit" onClick={() => {
                        props.setOpen(false);
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField
                    required
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
                <Button fullWidth variant="contained" onClick={() => console.log("open prompt window")}>Prompt</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} startIcon={<CancelIcon/>} variant="outlined">Cancel</Button>
                <Button onClick={handleUpdate} startIcon={<EditIcon/>} variant="outlined">Update</Button>
                <IconButton onClick={() => setOpenOperationDeletionDialog(true)} sx={{minHeight: "36.5px"}}><DeleteIcon
                    color="warning"/></IconButton>
            </DialogActions>
            <OperationDeletionDialog
                handleDeletion={handleDeletion}
                operationId={props.operationId}
                operationName={operation?.name || ""}
                open={openOperationDeletionDialog}
                setOpen={setOpenOperationDeletionDialog}/>
        </Dialog>
    );
}
