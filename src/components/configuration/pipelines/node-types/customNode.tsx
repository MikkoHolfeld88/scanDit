import React, {useEffect} from "react";
import {Badge, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Handle, NodeProps, Position} from "reactflow";
import {NodeData} from "../../../../models/NodeData";
import {useAppDispatch} from "../../../../store/store";
import {
    centerNodesHorizontally,
    centerNodesVertically,
    updateNodeDimensions
} from "../../../../store/slices/pipeline/reducers";
import {useSelector} from "react-redux";
import {selectLastNodeId} from "../../../../store/slices/pipeline/selectors";
import ExtensionIcon from "@mui/icons-material/Extension";
import Box from "@mui/material/Box";
import {EditPipelineMenu} from "../desktop/editPipelineMenu";

export function CustomNodeComponent({data}: NodeProps<NodeData>) {
    const dispatch = useAppDispatch();
    const lastNodeId = useSelector(selectLastNodeId);
    const [openEditPipelineMenu, setOpenEditPipelineMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenEditPipelineMenu(true);
    };

    return (
        <div id={data.id}>
            {
                data.type !== 'input' && <Handle type="target" position={Position.Top}/>
            }
            <Card className="template-card" onClick={handleClick}>
                <CardContent className="template-card-content">
                    <Box style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            <b>Type</b>: {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                        </Typography>
                        <Badge badgeContent={data.index + 1}>
                            <ExtensionIcon fontSize="small"/>
                        </Badge>
                    </Box>
                    <Typography variant="h6" className="template-card-title">
                        {data.title}
                    </Typography>
                    <br/>
                </CardContent>

            </Card>
            {
                data.type !== 'output' && <Handle type="source" position={Position.Bottom} />
            }
            <EditPipelineMenu open={openEditPipelineMenu} setOpen={setOpenEditPipelineMenu} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </div>
    );
}


