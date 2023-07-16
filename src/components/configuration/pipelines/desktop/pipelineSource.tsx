import {Card, CardContent, Menu, MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import React from "react";
import {PaperProps} from "./paperProps";
import EditIcon from "@mui/icons-material/Edit";
import {darkMain} from "../../../../style/theme";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import DeleteIcon from "@mui/icons-material/Delete";

export interface IPipelineSourceProps {
    index: number;
    type: string;
    data?: any;
    dataUrl?: string;
}

export const PipelineSource = (props: IPipelineSourceProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Card key={props.index + "_operation" + props.index} style={{margin: "5px"}}
                  sx={{
                      boxShadow: open ? '2px 4px 8px rgba(0,0,0,0.40)' : '0px 2px 6px rgba(0,0,0,0.20)',
                      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                      padding: 0,
                      margin: "5px",
                      '&:hover': {
                          boxShadow: '2px 4px 10px rgba(0,0,0,0.42)',
                      },
                      animation: open ? 'blink 1s infinite' : 'none',
                      '@keyframes blink': {
                          '0%': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                          '50%': { backgroundColor: 'transparent' },
                          '100%': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                      },
                  }}
                  onClick={handleClick}>
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
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={PaperProps}>
                <MenuItem onClick={handleClose}><EditIcon sx={{color: darkMain, marginRight: "4px"}}/>Edit</MenuItem>
                <MenuItem onClick={handleClose}><OpenWithIcon sx={{color: darkMain, marginRight: "4px"}}/>Move</MenuItem>
                <MenuItem onClick={handleClose}><DeleteIcon sx={{color: darkMain, marginRight: "4px"}}/>Delete</MenuItem>
            </Menu>
        </React.Fragment>
    )
}
