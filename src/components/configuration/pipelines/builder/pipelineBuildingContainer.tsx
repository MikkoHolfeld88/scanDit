import * as React from 'react';
import {useEffect} from 'react';
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
import {useSelector} from "react-redux";
import {selectAppMode} from "../../../../store/slices/appConfig/selectors";
import {AppMode} from "../../../../models/AppMode";
import {selectLatestCreatedTemplate} from "../../../../store/slices/template/selectors";
import {Template} from "../../../../models/Template";
import {AppDispatch, useAppDispatch} from "../../../../store/store";
import {Pipeline} from "../../../../models/Pipeline";
import {TemplateRelation} from "../../../../models/TemplateRelation";
import {APP_MODE} from "../../../../enums/appMode.enum";
import {selectDirection} from "../../../../store/slices/pipeline/selectors";
import {setDirection} from "../../../../store/slices/pipeline/reducers";

interface PipelineBuildingContainerProps {
    pipeline: Pipeline | undefined;
    pipelineId: string;
    name: string
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const PipelineBuildingContainer = (props: PipelineBuildingContainerProps) => {
    const appMode: AppMode = useSelector(selectAppMode);
    const dispatch: AppDispatch = useAppDispatch();
    const latestCreatedTemplate: Template | undefined = useSelector(selectLatestCreatedTemplate);
    const direction = useSelector(selectDirection);
    const [templateRelations, setTemplateRelations] = React.useState<TemplateRelation[]>([]);

    useEffect(() => {
        if (props.pipeline) {
            setTemplateRelations(props.pipeline.templates);
        }
    }, []);

    useEffect(() => {
        if (!latestCreatedTemplate) return;

        if (appMode === APP_MODE.TEMPLATE_ADDITION_TO_PIPELINE){
            const templateRelation = {
                id: latestCreatedTemplate.id,
                parentIds: getParentIdsOfLatestCreated(),
                childIds: [],
                directions: [direction]
            };

            setTemplateRelations([...templateRelations, templateRelation]);
        }
    }, [latestCreatedTemplate]);

    const getParentIdsOfLatestCreated = (): string[] => {
        if (templateRelations.length === 0) {
            return [];
        }

        return [templateRelations[templateRelations.length - 1].id];
    }

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSave = () => {
        // save
        props.setOpen(false);
    }

    const onNavigateToNode = (direction: DIRECTIONS) => {
        dispatch(setDirection(direction))
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
                    <PipelineViewer
                        templateRelations={templateRelations}
                        setTemplateRelations={setTemplateRelations}/>
                </SplitterPanel>
            </Splitter>
        </Dialog>
    );
}
