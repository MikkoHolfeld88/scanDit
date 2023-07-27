import {Template} from "../../../models/Template";
import {Card, CardActions, CardContent} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface TemplateCardProps {
    template: Template
    index?: number
}

export const TemplateCard = (props: TemplateCardProps) => {
    return (
        <Card sx={{margin: "2px"}}>
            <CardContent sx={{padding: "2px", margin: "2px"}}>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                        {props.template.type}
                </Typography>
                <Typography sx={{fontSize: 14}}>
                    <b>{props.template.name.toUpperCase()}</b>
                </Typography>
            </CardContent>
        </Card>
    );
}
