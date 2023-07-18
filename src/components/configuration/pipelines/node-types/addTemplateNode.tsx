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
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import {AddTemplateMenu} from "./addTemplateMenu";

export function AddTemplateNode({data}: NodeProps<NodeData>) {
    const dispatch = useAppDispatch();
    const lastNodeId = useSelector(selectLastNodeId);
    const [openAddTemplateMenu, setOpenAddTemplateMenu] = React.useState<boolean>(false);
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
        setOpenAddTemplateMenu(true);
    };

    return (
        <div id={data.id}>
            <Handle type="target" position={Position.Top}/>
            <Card className="template-card" onClick={handleClick}>
                <CardContent className={openAddTemplateMenu ? "template-card-content-add-menu-opened" : "template-card-content-add"}>
                    <Box style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{fontSize: 22, color: "linear-gradient(90deg, #d2d2d2 50%, transparent 50%)"}} gutterBottom>
                            Add
                        </Typography>
                        <AddIcon sx={{color: "linear-gradient(90deg, #d2d2d2 50%, transparent 50%)", fontSize: 32}}/>
                    </Box>
                </CardContent>
            </Card>
            <AddTemplateMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={openAddTemplateMenu} setOpen={setOpenAddTemplateMenu} />
        </div>
    );
}


