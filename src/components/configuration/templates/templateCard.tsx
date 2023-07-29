import {Template} from "../../../models/Template";
import {Card, CardContent} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import {useSelector} from "react-redux";
import {AppMode} from "../../../models/AppMode";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import {APP_MODE} from "../../../enums/appMode.enum";
import {MUITheme, warnMain, warnSuperDark, warnSuperLight} from "../../../style/theme";
import { keyframes } from '@emotion/react';
import {deleteTemplate} from "../../../store/slices/template/reducers";
import {AppDispatch, useAppDispatch} from "../../../store/store";

const blink = keyframes`
  0%, 100% {
    background-color: white;
  }
  50% {
    background-color: ${warnSuperLight};
  }
`;

interface TemplateCardProps {
    template: Template
    index?: number
}

export const TemplateCard = (props: TemplateCardProps) => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);

    const handleCardClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (appMode === APP_MODE.TEMPLATE_DELETION) {
            event.stopPropagation();
            dispatch(deleteTemplate(props.template.id));
        }
    }

    return (
        <Card
            sx={{
                margin: "2px",
                height: "9vh",
                position: "relative",
                backgroundColor: appMode === APP_MODE.TEMPLATE_DELETION ? warnSuperLight : undefined,
                animation: `${appMode === APP_MODE.TEMPLATE_DELETION ? blink : ''} 2s linear infinite`
            }}
            onClick={(event) => handleCardClick(event)}>
            {appMode === APP_MODE.TEMPLATE_DELETION &&
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                }}>
                    <DeleteForeverIcon  style={{ color: warnMain,  filter: `drop-shadow(0 0 1px black)`}}/>
                </Box>
            }
            <CardContent sx={{padding: "2px", margin: "2px"}}>
                <Typography sx={{fontSize: "10px"}}>
                    {props.template.type}
                </Typography>
                <Typography sx={{
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    <b>{props.template.name.toUpperCase()}</b>
                </Typography>
            </CardContent>
        </Card>
    );
}
