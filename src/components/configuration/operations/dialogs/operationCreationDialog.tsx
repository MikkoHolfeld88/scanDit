import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {getAuth} from "firebase/auth";
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from "@mui/material/Typography";
import {FormControl, IconButton, InputLabel, Select, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch} from "../../../../store/store";
import {v4} from "uuid";
import {Transition} from "../../pipelines/dialogs/pipelineCreationDialog";
import {Operation} from "../../../../models/Operation";
import {OperationType} from "../../../../models/operationTypes/OperationType";
import {addOperation} from "../../../../store/slices/operations/reducers";
import MenuItem from "@mui/material/MenuItem";
import {OPERATION_TYPE} from "../../../../enums/operationsTypes/operationType.enum";
import {PromptWindow} from "./specificFields/promptWindow";

export const getRenderComponentForType = (
    type: OperationType,
    prompt: string,
    setPrompt: (prompt: string) => void
) => {
    if (type === null || type === undefined) {
        return null;
    }

    switch (type) {
        case OPERATION_TYPE.CALCULATION:
        case OPERATION_TYPE.CLASSIFICATION:
        case OPERATION_TYPE.COMPARISON:
        case OPERATION_TYPE.EXPORT:
        case OPERATION_TYPE.EXTRACTION:
        case OPERATION_TYPE.GENERATION:
        case OPERATION_TYPE.IMPORT:
        case OPERATION_TYPE.SENTIMENT:
        case OPERATION_TYPE.SUMMARIZATION:
        case OPERATION_TYPE.TRANSFORMATION:
        case OPERATION_TYPE.TRANSLATION:
            return <PromptWindow prompt={prompt} setPrompt={setPrompt}/>;
        default:
            return null;
    }
}

interface OperationCreationDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const OperationCreationDialog = (props: OperationCreationDialogProps) => {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [author, setAuthor] = React.useState<string>(getAuth().currentUser?.displayName || "");
    const [icon, setIcon] = React.useState<string>("");
    const [type, setType] = React.useState<OperationType>(null);
    const [prompt, setPrompt] = React.useState<string>("");

    useEffect(() => {
        return () => {
            clearLocalStates();
        }
    }, []);

    const handleCreate = () => {
        if (name === "" || type === null || prompt === "") {
            return;
        }

        const newOperation: Operation = {
            id: v4().toString(),
            name: name,
            description: description,
            created: new Date().toISOString(),
            author: author,
            icon: icon,
            type: type,
            prompt: prompt
        }
        dispatch(addOperation(newOperation));
        handleClose();
    };

    const clearLocalStates = () => {
        setName("");
        setDescription("");
        setAuthor("");
        setIcon("");
        setType(null);
        setPrompt("");
    }

    const handleClose = () => {
        clearLocalStates();
        props.setOpen(false);
    };

    const renderTypeSpecificFields = () => {
        return getRenderComponentForType(type, prompt, setPrompt);
    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6">Create operation</Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose}>
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
                <FormControl fullWidth required sx={{mt: 1, mb: 1}}>
                    <InputLabel id="operation-type-label">Type</InputLabel>
                    <Select
                        label="Type"
                        labelId="operation-type-label"
                        value={type}
                        onChange={(e) => setType(e.target.value as OperationType)}>
                        {
                            Object.keys(OPERATION_TYPE).map((key) => {
                                return <MenuItem key={key} value={OPERATION_TYPE[key as keyof typeof OPERATION_TYPE]}>{key}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
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
                <Button onClick={handleClose} startIcon={<CancelIcon/>} variant="outlined">Cancel</Button>
                <Button onClick={handleCreate} startIcon={<AddIcon/>} variant="outlined">Create</Button>
            </DialogActions>
        </Dialog>
    );
}
