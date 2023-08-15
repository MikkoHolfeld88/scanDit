import React, {useEffect} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector} from "react-redux";
import {
    selectLatestCreatedPipeline,
    selectPipelines,
    selectPipelinesStatus
} from "../../../store/slices/pipeline/selectors";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import {AppMode} from "../../../models/AppMode";
import DeleteIcon from "@mui/icons-material/Delete";
import {APP_MODE} from "../../../enums/appMode.enum";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {deletePipeline} from "../../../store/slices/pipeline/reducers";
import {PipelineEditDialog} from "./dialogs/pipelineEditDialog";
import {Pipeline} from "../../../models/Pipeline";
import {FetchingStatus} from "../../../models/FetchingStatus";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {Col, Container, Row} from "react-bootstrap";
import {Skeleton} from "@mui/material";
import "./style.css"
import {PipelineBuilder} from "./builder/pipelineBuilder";
import {PipelineBuildingContainer} from "./builder/pipelineBuildingContainer";
import {resetAppMode, setAppMode} from "../../../store/slices/appConfig/reducers";

const PipelineListSkeleton = () => {
    return (
        <Container style={{marginTop: "5px"}}>
            <Row>
                <Col xs={2}>
                    <Skeleton variant="circular" width={40} height={40}/>
                </Col>
                <Col xs={8}>
                    <Skeleton variant="rectangular" height={40}/>
                </Col>
                <Col xs={2}>
                    <Skeleton variant="rectangular" height={40}/>
                </Col>
            </Row>
        </Container>
    )
}

export const PipelineList = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const pipelines: Pipeline[] = useSelector(selectPipelines);
    const pipelinesStatus: FetchingStatus = useSelector(selectPipelinesStatus);
    const [openPipelineEditDialog, setOpenPipelineEditDialog] = React.useState<boolean>(false);
    const [openPipelineBuilder, setOpenPipelineBuilder] = React.useState<boolean>(false);
    const [pipelineId, setPipelineId] = React.useState<string>("");
    const latestCreatedPipeline: Pipeline = useSelector(selectLatestCreatedPipeline);

    useEffect(() => {
        if (appMode === APP_MODE.TEMPLATE_ADDITION_TO_PIPELINE){
            setPipelineId(latestCreatedPipeline.id);
            setOpenPipelineBuilder(true);
        }
    }, [appMode])

    const handlePipelineEditOpen = (event: React.MouseEvent<SVGSVGElement>, pipelineId: string) => {
        event.stopPropagation();
        setPipelineId(pipelineId);
        setOpenPipelineEditDialog(true);
    }

    const handlePipelineDeletion = (event: React.MouseEvent<SVGSVGElement>, pipelineId: string) => {
        event.stopPropagation();
        dispatch(deletePipeline(pipelineId));
    };

    const renderPageContent = () => {
        if (pipelinesStatus === FETCHING_STATE.LOADING) {
            const skeletonPreview = Array.from({length: 10}, (_, index) => index);

            return (
                skeletonPreview.map((skeleton) => {
                    return (
                        PipelineListSkeleton()
                    )
                })
            )
        } else {
            return (
                <React.Fragment>
                    <List dense sx={{width: '100%', bgcolor: 'background.paper', borderRadius: "0px"}}>
                        {pipelines.map((pipeline, index) => {
                            return (
                                <ListItem
                                    onClick={() => console.log("clicked")}
                                    key={pipeline.id + "_" + index}
                                    secondaryAction={
                                        appMode !== APP_MODE.PIPELINE_DELETION
                                            ?
                                            <EditIcon onClick={(event) => handlePipelineEditOpen(event, pipeline.id)}/>
                                            : <DeleteIcon
                                                id="pipeline-deletion-icon"
                                                className="wiggle"
                                                onClick={(event) => handlePipelineDeletion(event, pipeline.id)}
                                                color="warning"/>
                                    }
                                    disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar src={pipeline.icon}/>
                                        </ListItemAvatar>
                                        <ListItemText id={pipeline.id} primary={`${pipeline.name}`}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <PipelineEditDialog
                        open={openPipelineEditDialog}
                        setOpen={setOpenPipelineEditDialog}
                        pipelineId={pipelineId}
                    />
                    <PipelineBuildingContainer
                        pipeline={pipelines.find(pipeline => pipeline.id === pipelineId)}
                        pipelineId={pipelineId}
                        name={latestCreatedPipeline && latestCreatedPipeline?.name || ""}
                        open={openPipelineBuilder}
                        setOpen={setOpenPipelineBuilder}/>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            {
                renderPageContent()
            }
        </React.Fragment>
    );
}
