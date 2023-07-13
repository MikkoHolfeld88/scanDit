import {Card, CardContent} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import React from "react";

export interface IPipelineOperationProps {
    index: number;
    id: string;
    type: string;
}

export const PipelineOperation = (props: IPipelineOperationProps) => {
    return (
        <Card key={props.index + "_operation" + props.id} style={{padding: 0, margin: "5px"}}>
            <CardContent>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography sx={{fontSize: 7}} color="text.secondary" gutterBottom>
                        Operation
                    </Typography>
                    <PrecisionManufacturingIcon style={{fontSize: "12px"}} />
                </Box>
                <Typography sx={{fontSize: 9}}>
                    {props.type}
                </Typography>
            </CardContent>
        </Card>
    )
}
