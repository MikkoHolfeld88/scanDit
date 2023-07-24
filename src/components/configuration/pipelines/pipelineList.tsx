import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector} from "react-redux";
import {selectPipelines} from "../../../store/slices/pipeline/selectors";
import {PipelineBuildingContainer} from "./builder/pipelineBuildingContainer";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import {AppMode} from "../../../models/AppMode";
import DeleteIcon from "@mui/icons-material/Delete";
import {APP_MODE} from "../../../enums/appMode.enum";
import {useAppDispatch} from "../../../store/store";
import {setAppMode} from "../../../store/slices/appConfig/reducers";
import {deletePipeline} from "../../../store/slices/pipeline/reducers";
import {PipelineEditDialog} from "./dialogs/pipelineEditDialog";

export const PipelineList = () => {
    const dispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const pipelines = useSelector(selectPipelines)
    const [openPipelineBuilder, setOpenPipelineBuilder] = React.useState<boolean>(false);
    const [openPipelineEditDialog, setOpenPipelineEditDialog] = React.useState<boolean>(false);
    const [pipelineId, setPipelineId] = React.useState<string>("");
    const [pipelineName, setPipelineName] = React.useState<string>("");

    const handlePipelineEditOpen = (event: React.MouseEvent<SVGSVGElement>, pipelineId: string) => {
        event.stopPropagation();
        setPipelineId(pipelineId);
        setOpenPipelineEditDialog(true);
    }

    const handlePipelineBuilderOpen = (pipelineId: string) => {
        if (appMode !== APP_MODE.PIPELINE_DELETION) {
            setPipelineId(pipelineId);
            setPipelineName(pipelines.find(pipeline => pipeline.id === pipelineId)?.name || "");
            setOpenPipelineBuilder(true);
        }

        if (appMode === APP_MODE.PIPELINE_DELETION) {
            dispatch(setAppMode(APP_MODE.DEFAULT));
        }
    };

    const handlePipelineDeletion = (event: React.MouseEvent<SVGSVGElement>, pipelineId: string) => {
        event.stopPropagation();
        dispatch(deletePipeline(pipelineId));
        dispatch(setAppMode(APP_MODE.DEFAULT));
    };

    return (
        <React.Fragment>
            <List dense sx={{width: '100%', bgcolor: 'background.paper', borderRadius: "0px"}}>
                {pipelines.map((pipeline, index) => {
                    return (
                        <ListItem
                            onClick={() => handlePipelineBuilderOpen(pipeline.id)}
                            key={pipeline.id + "_" + index}
                            secondaryAction={
                                appMode !== APP_MODE.PIPELINE_DELETION
                                    ? <EditIcon onClick={(event) => handlePipelineEditOpen(event, pipeline.id)}/>
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
            <PipelineBuildingContainer
                open={openPipelineBuilder}
                setOpen={setOpenPipelineBuilder}
                pipelineId={pipelineId}
                name={pipelineName}
            />
            <PipelineEditDialog
                open={openPipelineEditDialog}
                setOpen={setOpenPipelineEditDialog}
                pipelineId={pipelineId}
            />
        </React.Fragment>
    );
}
