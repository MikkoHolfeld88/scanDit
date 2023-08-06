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
import {deletePipeline, editPipeline} from "../../../../store/slices/pipeline/reducers";
import {Pipeline} from "../../../../models/Pipeline";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector} from "react-redux";
import {selectPipelineById} from "../../../../store/slices/pipeline/selectors";
import {PipelineBuildingContainer} from "../builder/pipelineBuildingContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import {PipelineDeletionDialog} from "./pipelineDeletionDialog";
import {Transition} from "./pipelineCreationDialog";

interface PipelineEditionDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    pipelineId: string;
}

export const PipelineEditDialog = (props: PipelineEditionDialogProps) => {
    const dispatch = useAppDispatch();
    const pipeline: Pipeline | undefined = useSelector((state: RootState) => selectPipelineById(state, props.pipelineId));
    const [openPipelineBuilder, setOpenPipelineBuilder] = React.useState<boolean>(false);
    const [openPipelineDeletionDialog, setOpenPipelineDeletionDialog] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [author, setAuthor] = React.useState<string>("");
    const [icon, setIcon] = React.useState<string>("");

    useEffect(() => {
        if (pipeline) {
            setName(pipeline.name);
            setDescription(pipeline.description || description);
            setAuthor(pipeline.author || getAuth().currentUser?.displayName || author);
            setIcon(pipeline.icon || icon);
        }
    }, [pipeline]);

    const handleUpdate = () => {
        if (name === "" || name === null || !pipeline?.id || !pipeline.created) {
            return;
        }

        const editedPipeline: Pipeline = {
            id: pipeline.id,
            name: name,
            description: description ? description : undefined,
            created: pipeline.created,
            updated: new Date().toISOString(),
            author: author ? author : undefined,
            icon: icon ? icon : undefined,
            templates: pipeline.templates,
        }

        dispatch(editPipeline(editedPipeline));
        handleClose();
    };

    const handlePipelineBuilderClick = () => {
        handleUpdate();
        setOpenPipelineBuilder(true);
        handleClose();
    }

    const handleDeletion = () => {
        if (pipeline && pipeline.id){
            dispatch(deletePipeline(pipeline?.id));
            setOpenPipelineDeletionDialog(false);
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

    const handleCancel = () => {
        props.setOpen(false);
        setName(pipeline?.name || "");
        setDescription(pipeline?.description || "");
        setAuthor(pipeline?.author || "");
        setIcon(pipeline?.icon || "")
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
                    <Typography variant="h6">Edit pipeline</Typography>
                    <IconButton edge="end" color="inherit" onClick={() => {
                        props.setOpen(false);
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Button fullWidth variant="contained" onClick={handlePipelineBuilderClick}>Pipeline builder</Button>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} startIcon={<CancelIcon/>} variant="outlined">Cancel</Button>
                <Button onClick={handleUpdate} startIcon={<EditIcon/>} variant="outlined">Update</Button>
                <IconButton onClick={() => setOpenPipelineDeletionDialog(true)} sx={{minHeight: "36.5px"}} ><DeleteIcon color="warning" /></IconButton>
            </DialogActions>
            <PipelineBuildingContainer
                pipelineId={pipeline?.id || ""}
                name={pipeline?.name || ""}
                open={openPipelineBuilder}
                setOpen={setOpenPipelineBuilder}/>
            <PipelineDeletionDialog
                handleDeletion={handleDeletion}
                pipelineId={props.pipelineId}
                pipelineName={pipeline?.name || ""}
                open={openPipelineDeletionDialog}
                setOpen={setOpenPipelineDeletionDialog}/>
        </Dialog>
    );
}
