import React, {useEffect} from "react";
import {Badge, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Handle, NodeProps, Position} from "reactflow";
import {NodeData} from "../../../models/NodeData";
import {useAppDispatch} from "../../../store/store";
import {
    centerNodesHorizontally,
    centerNodesVertically,
    updateNodeDimensions
} from "../../../store/slices/pipeline/reducers";
import {useSelector} from "react-redux";
import {selectLastNodeId} from "../../../store/slices/pipeline/selectors";
import ExtensionIcon from "@mui/icons-material/Extension";
import Box from "@mui/material/Box";
import {Operation} from "../../../models/Operation";
import {selectIsTabletOrGreater} from "../../../store/slices/sidebar/selectors";
import {PipelineOperation} from "./operation";

export function CustomNodeComponent({data}: NodeProps<NodeData>) {
    const dispatch = useAppDispatch();
    const isTabletOrGreater = useSelector(selectIsTabletOrGreater);
    const lastNodeId = useSelector(selectLastNodeId);

    useEffect(() => {
        const nodeElement = document.getElementById(data.id);
        const nodeHeight = nodeElement ? nodeElement.offsetHeight : 0;
        const nodeWidth = nodeElement ? nodeElement.offsetWidth : 0;

        dispatch(updateNodeDimensions({
            nodeId: data.id,
            height: nodeHeight,
            width: nodeWidth
        }));

        if (lastNodeId === data.id) {
            dispatch(centerNodesHorizontally());
            dispatch(centerNodesVertically());
        }

    }, [data]);

    const calcOperationPlacement = (operations: Operation[]) => {
        if (isTabletOrGreater) {
            switch (operations.length) {
                case 0:
                    return 'repeat(1, 1fr)';
                case 1:
                    return 'repeat(1, 1fr)';
                case 2:
                    return 'repeat(2, 1fr)';
                case 3:
                    return 'repeat(3, 1fr)';
                case 4:
                    return 'repeat(4, 1fr)';
                case 5:
                    return 'repeat(5, 1fr)';
                case 6:
                    return 'repeat(6, 1fr)';
                default:
                    return 'repeat(6, 1fr)';
            }
        }

        switch (operations.length) {
            case 0:
                return 'repeat(1, 1fr)';
            case 1:
                return 'repeat(1, 1fr)';
            case 2:
                return 'repeat(2, 1fr)';
            case 3:
                return 'repeat(3, 1fr)';
            default:
                return 'repeat(3, 1fr)';
        }
    }

    return (
        <div id={data.id}>
            {
                data.type !== 'input' && <Handle type="target" position={Position.Top}/>
            }
            <Card className="template-card">
                <CardContent className="template-card-content">
                    <Box style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Template
                        </Typography>
                        <Badge badgeContent={data.index + 1}>
                            <ExtensionIcon fontSize="small"/>
                        </Badge>
                    </Box>
                    <Typography variant="h6">
                        {data.title}
                    </Typography>
                    <Typography sx={{fontSize: 10, marginTop: "0"}} color="text.secondary" gutterBottom>
                        <b>Type</b>: {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                    </Typography>
                </CardContent>
                <CardActions className="card-actions">
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: calcOperationPlacement(data.operations),
                        gap: '5px'
                    }}>
                        {
                            data.operations.map((operation, index) => {
                                return (
                                    <PipelineOperation
                                        index={index}
                                        id={operation.id}
                                        type={operation.type}/>
                                )
                            })
                        }
                    </Box>
                </CardActions>
            </Card>
            {
            data.type !== 'output' && <Handle type="source" position={Position.Bottom}/>
            }
        </div>
    );
}
