import Typography from "@mui/material/Typography";
import {Badge, List, ListItem} from "@mui/material";
import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import PipelineIcon from "../../../../assets/icons/pipeline.png"
import {styled} from "@mui/material/styles";
import {Pipeline as PipelineType} from "../../../../models/Pipeline";
import {examplePipeline} from "../desktop/examplePipeline";
import ListItemButton from "@mui/material/ListItemButton";
import {PipelineMobileDialog} from "./pipelineMobileDialog";

const pipelines: PipelineType[] = [examplePipeline];

const SmallAvatar = styled(Avatar)(({theme}) => ({
    fontSize: "12px",
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export const Pipeline = () => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [currentPipeline, setCurrentPipeline] = React.useState<PipelineType>(pipelines[0]);

    const displayPipelineDialog = (pipeline: PipelineType) => {
        setCurrentPipeline(pipeline);
        setDialogOpen(true);
    }

    return (
        <React.Fragment>
            <List sx={{width: '100%', maxWidth: "100vw", bgcolor: 'background.paper', padding: 0}}>
                {
                    pipelines.map((pipeline: PipelineType, index: number) => {
                        return (
                            <ListItem alignItems="flex-start" style={{padding: 0}}>
                                <ListItemButton onClick={() => displayPipelineDialog(pipeline)}>
                                    <ListItemAvatar>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                            badgeContent={
                                                <SmallAvatar style={{
                                                    border: "solid 1px grey",
                                                    color: "black",
                                                    backgroundColor: "white"
                                                }}>
                                                    {index + 1}
                                                </SmallAvatar>
                                            }>
                                            <Avatar alt="Remy Sharp" src={PipelineIcon}
                                                    style={{border: "solid 1px grey"}}/>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={pipeline.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{display: 'inline'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary">
                                                    {pipeline.description}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <PipelineMobileDialog open={dialogOpen} setOpen={setDialogOpen} pipeline={currentPipeline}/>
        </React.Fragment>

    )
}
