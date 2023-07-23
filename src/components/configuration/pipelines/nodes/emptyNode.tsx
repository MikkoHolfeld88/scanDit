import React from 'react';
import {Handle, Position} from 'reactflow';
import "./style.css"
import {Typography} from "@mui/material";

interface EmptyNodeProps {
    data: any;
    isConnectable: boolean;
}

export const EmptyNode = (props: EmptyNodeProps) => {
    return (
        <div className="empty-node">
            <Typography variant="caption">
                {props.data.label}
            </Typography>
            <Handle
                className="basic-handle"
                type="source"
                position={Position.Right}
                id="right"
            />
            <Handle
                className="basic-handle"
                type="source"
                position={Position.Bottom}
                id="bottom"
            />
            <Handle
                className="basic-handle"
                type="source"
                position={Position.Left}
                id="left"
            />
        </div>
    )
}

