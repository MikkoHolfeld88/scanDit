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
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from "@mui/material/Typography";
import {FormControl, IconButton, InputLabel, Select, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch} from "../../../../store/store";
import {v4} from "uuid";
import {Template} from "../../../../models/Template";
import {addTemplate} from "../../../../store/slices/template/reducers";
import {TemplateType} from "../../../../models/TemplateType";
import {TEMPLATE_TYPE} from "../../../../enums/templateType.enum";
import MenuItem from "@mui/material/MenuItem";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface TemplateCreationDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const TemplateCreationDialog = (props: TemplateCreationDialogProps) => {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [author, setAuthor] = React.useState<string>(getAuth().currentUser?.displayName || "");
    const [type, setType] = React.useState<TemplateType>(null);

    useEffect(() => {
        return () => {
            clearLocalStates();
        }
    }, []);

    const handleCreate = () => {
        if (name === "" || type === null) {
            return;
        }

        const newTemplate: Template = {
            id: v4().toString(),
            name: name,
            description: description,
            editable: true,
            created: new Date().toISOString(),
            author: author,
            type: type,
            operations: []
        }
        dispatch(addTemplate(newTemplate));
        handleClose();
    };

    const clearLocalStates = () => {
        setName("");
        setDescription("");
        setAuthor("");
        setType(null);
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
                    <Typography variant="h6">Create template</Typography>
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
                    <InputLabel id="template-type-label">Type</InputLabel>
                    <Select
                        label="Type"
                        labelId="template-type-label"
                        value={type}
                        onChange={(e) => setType(e.target.value as TemplateType)}>
                        {
                            Object.keys(TEMPLATE_TYPE).map((key) => {
                                return <MenuItem key={key} value={TEMPLATE_TYPE[key as keyof typeof TEMPLATE_TYPE]}>{key}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
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
