import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {Container, Row} from "react-bootstrap";
import {DialogTransition} from "../../../../layout/transitions/dialogTransition";
import {Template} from "../../../../../models/Template";
import {Sequencer} from "./sequencer";

interface OperationSequenceCreatorProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    template: Template | undefined;
}

export const OperationSequenceCreator = (props: OperationSequenceCreatorProps) => {
    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSave = () => {
        props.setOpen(false);
    }

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={DialogTransition}>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Container>
                        <Row>
                            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                {`Operation composer`}
                            </Typography>
                        </Row>
                        <Row>
                            <Typography sx={{ml: 2, flex: 1}} variant="caption" component="div">
                                {props.template?.name}
                            </Typography>
                        </Row>
                    </Container>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Sequencer/>
        </Dialog>
    )
}


