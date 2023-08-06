import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {PipelineBuilder} from "./pipelineBuilder";
import {Splitter, SplitterPanel} from "primereact/splitter";
import {PipelineViewer} from "./pipelineViewer";
import {Container, Row} from "react-bootstrap";
import {DIRECTIONS} from "../../../../enums/directions.enum";
import {DialogTransition} from "../../../layout/transitions/dialogTransition";

interface PipelineBuildingContainerProps {
    pipelineId: string;
    name: string
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const PipelineBuildingContainer = (props: PipelineBuildingContainerProps) => {
    const [direction, setDirection] = React.useState<DIRECTIONS>(DIRECTIONS.DOWN);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSave = () => {
        console.log("Save pipeline - call to database");
        props.setOpen(false);
    }

    const onNavigateToNode = (direction: DIRECTIONS) => {
        setDirection(direction);
        console.log("Navigate to node", direction);
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
                                {`Pipeline Builder`}
                            </Typography>
                        </Row>
                        <Row>
                            <Typography sx={{ml: 2, flex: 1}} variant="caption" component="div">
                                {props.name || props.pipelineId}
                            </Typography>
                        </Row>
                    </Container>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Splitter style={{height: '100%'}} layout="vertical">
                <SplitterPanel size={20}>
                    <PipelineBuilder
                        setOpenPipelineBuilder={props.setOpen}
                        pipelineId={props.pipelineId}
                        onNavigate={onNavigateToNode}/>
                </SplitterPanel>
                <SplitterPanel size={80} minSize={50}>
                    <PipelineViewer pipelineId={props.pipelineId}/>
                </SplitterPanel>
            </Splitter>
        </Dialog>
    );
}
