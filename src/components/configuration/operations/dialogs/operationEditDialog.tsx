import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {getAuth} from "firebase/auth";
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from "@mui/material/Typography";
import {FormControl, IconButton, InputLabel, Select, TextField} from "@mui/material";
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
import {OperationType} from "../../../../models/operationTypes/OperationType";
import {OPERATION_TYPE} from "../../../../enums/operationsTypes/operationType.enum";
import MenuItem from "@mui/material/MenuItem";
import {getRenderComponentForType} from "./operationCreationDialog";

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
    const [type, setType] = React.useState<OperationType>(null);
    const [prompt, setPrompt] = React.useState<string>("");

    useEffect(() => {
        if (operation) {
            setName(operation.name);
            setType(operation.type);
            setDescription(operation.description || description);
            setAuthor(operation.author || getAuth().currentUser?.displayName || author);
            setIcon(operation.icon || icon);
            setPrompt(operation.prompt || prompt)
        }
    }, [operation]);

    const handleUpdate = () => {
        if (name === "" || name === null || !operation?.id || !operation.created || operation.prompt === "") {
            return;
        }

        const editedOperation: Operation = {
            type: type,
            id: operation.id,
            name: name,
            description: description ? description : undefined,
            created: operation.created,
            author: author ? author : undefined,
            icon: icon ? icon : undefined,
            prompt: prompt
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

    const renderTypeSpecificFields = () => {
        return getRenderComponentForType(type, prompt, setPrompt);
    };

    const handleCancel = () => {
        props.setOpen(false);
        setName(operation?.name || "");
        setDescription(operation?.description || "");
        setAuthor(operation?.author || "");
        setIcon(operation?.icon || "");
    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCancel}
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
                <FormControl fullWidth required sx={{mt: 1, mb: 1}}>
                    <InputLabel id="operation-type-label">Type</InputLabel>
                    <Select
                        label="Type"
                        labelId="operation-type-label"
                        value={type ?? ""}
                        onChange={(e) => setType(e.target.value as OperationType)}>
                        {
                            Object.keys(OPERATION_TYPE).map((key) => {
                                return <MenuItem key={key} value={OPERATION_TYPE[key as keyof typeof OPERATION_TYPE]}>{key}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <TextField
                    required
                    sx={{mb: 1, mt: 1}}
                    variant="outlined"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    fullWidth/>
                {
                    renderTypeSpecificFields()
                }
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
                <Button onClick={handleCancel} startIcon={<CancelIcon/>} variant="outlined">Cancel</Button>
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
