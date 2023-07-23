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
import {PipelineBuildingContainer} from "./pipelineBuildingContainer";
import {PipelineSpeedDial} from "./pipelineSpeedDial";

export const PipelineList = () => {
    const pipelines = useSelector(selectPipelines)
    const [openPipelineEditionWindow, setOpenPipelineEditionWindow] = React.useState<boolean>(false);
    const [pipelineId, setPipelineId] = React.useState<string>("");

    const handleDetailEdit = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        console.log("Edit pipeline");
    }

    const handlePipelineEdit = (pipelineId: string) => {
        setPipelineId(pipelineId);
        setOpenPipelineEditionWindow(true);
    }

    return (
        <React.Fragment>
            <List dense sx={{width: '100%', bgcolor: 'background.paper', borderRadius: "0px"}}>
                {pipelines.map((pipeline) => {
                    return (
                        <ListItem
                            onClick={() => handlePipelineEdit(pipeline.id)}
                            key={pipeline.id}
                            secondaryAction={<EditIcon onClick={(event) => handleDetailEdit(event)}/>}
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
            <PipelineBuildingContainer pipelineId={pipelineId} open={openPipelineEditionWindow} setOpen={setOpenPipelineEditionWindow}/>
        </React.Fragment>
    );
}
