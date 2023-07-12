import React from "react";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Handle, Position} from "reactflow";
import IconButton from "@mui/material/IconButton";
import {primaryGrey} from "../../../style/theme";

export function CustomNodeComponent({ data }: any) {
    return (
        <React.Fragment>
            <Handle type="target" position={Position.Top} />
            <Card sx={{width: 250, maxWidth: 250, paddingBottom: "0px", backgroundColor: "white"}}>
                <CardContent sx={{paddingBottom: "0px", backgroundColor: primaryGrey}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Template (order: {data.index + 1})
                    </Typography>
                    <Typography gutterBottom variant="h6">
                        {data.title}
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingTop: "0px", marginTop:"0px", paddingBottom:"0px"}}>
                    <IconButton aria-label="delete">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Handle type="source" position={Position.Bottom} />
        </React.Fragment>

    );
}
