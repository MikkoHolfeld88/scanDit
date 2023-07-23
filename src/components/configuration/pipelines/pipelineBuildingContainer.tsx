import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {useSelector} from "react-redux";
import {selectPipelineById} from "../../../store/slices/pipeline/selectors";
import {RootState} from "../../../store/store";
import {PipelineBuilder} from "./pipelineBuilder";
import {Splitter, SplitterPanel} from "primereact/splitter";
import {PipelineViewer} from "./pipelineViewer";
import {Container, Row} from "react-bootstrap";
import {DIRECTIONS} from "../../../enums/directions.enum";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import {AppMode} from "../../../models/AppMode";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface PipelineBuildingContainerProps {
    pipelineId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const PipelineBuildingContainer = (props: PipelineBuildingContainerProps) => {
    const pipeline = useSelector((state: RootState) => selectPipelineById(state, props.pipelineId));

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSave = () => {
        console.log("Save pipeline");
        props.setOpen(false);
    }

    const onCreateNode = () => {
        console.log("Create node");
    }

    const onNavigateToNode = (direction: DIRECTIONS) => {
        console.log("Navigate to node", direction);
    }

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={Transition}>
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
                                {`Pipeline editor`}
                            </Typography>
                        </Row>
                        <Row>
                            <Typography sx={{ml: 2, flex: 1}} variant="caption" component="div">
                                {pipeline?.name}
                            </Typography>
                        </Row>
                    </Container>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Splitter style={{ height: '100%' }} layout="vertical">
                <SplitterPanel size={20}>
                    <PipelineBuilder
                        onCreate={onCreateNode}
                        onNavigate={onNavigateToNode}/>
                </SplitterPanel>
                <SplitterPanel size={80} minSize={50}>
                    <PipelineViewer />
                </SplitterPanel>
            </Splitter>
        </Dialog>
    );
}
