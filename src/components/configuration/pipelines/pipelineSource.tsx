import {Card, CardContent} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import React from "react";

export interface IPipelineSourceProps {
    index: number;
    type: string;
    data?: any;
    dataUrl?: string;
}

export const PipelineSource = (props: IPipelineSourceProps) => {
    return (
        <React.Fragment>
            <Card key={props.index + "_operation" + props.index} style={{margin: "5px"}}>
                <CardContent>
                    <Box style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{fontSize: 7}} color="text.secondary" gutterBottom>
                            Source
                        </Typography>
                        <PrecisionManufacturingIcon style={{fontSize: "12px"}}/>
                    </Box>
                    <Typography sx={{fontSize: 9}}>
                        {props.type}
                    </Typography>
                    {
                        props.dataUrl &&
                        <Typography sx={{fontSize: 7}}>
                            {props.dataUrl}
                        </Typography>
                    }
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
