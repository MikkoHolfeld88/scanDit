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
import {selectIsTabletOrGreater} from "../../../store/slices/sidebar/selectors";
import {PipelineOperation} from "./pipelineOperation";
import {PipelineSource} from "./pipelineSource";
import {calcPlacement} from "../../../style/calcFunctions/calcOperationSourcesPlacement";
import {Source} from "../../../models/Source";
import {Operation} from "../../../models/Operation";

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

    /**
     * Rendert die Quellen basierend auf den übergebenen Quellen.
     *
     * @param sources - Die Quellen, die gerendert werden sollen.
     * @return Gibt eine Liste von PipelineSource Elementen zurück.
     */
    const renderSources = (sources: Source[]) => {
        return sources.map((source, index) => (
            <PipelineSource
                index={index}
                dataUrl={source.dataUrl}
                data={source.data}
                type={source.type}/>
        ));
    }

    /**
     * Rendert die Operationen basierend auf den übergebenen Operationen.
     *
     * @param operations - Die Operationen, die gerendert werden sollen.
     * @return Gibt eine Liste von PipelineOperation Elementen zurück.
     */
    const renderOperations = (operations: Operation[]) => {
        return operations.map((operation, index) => (
            <PipelineOperation
                index={index}
                id={operation.id}
                type={operation.type}/>
        ));
    }

    /**
     * Rendert die Innenobjekte (Quellen oder Operationen) basierend auf den übergebenen Daten.
     *
     * @param data - Die Daten, die entweder Quellen oder Operationen enthalten.
     * @param isTabletOrGreater - Ein boolescher Wert, der angibt, ob das Gerät ein Tablet oder größer ist.
     * @return Gibt ein Box-Element zurück, das entweder eine Liste von PipelineSource oder PipelineOperation Elementen enthält, basierend auf den Daten.
     */
    const renderInnerObjects = (data: NodeData, isTabletOrGreater: boolean) => {
        const objects: any = data.type === 'input' ? data.sources : data.operations;

        const placement = calcPlacement(objects, isTabletOrGreater);

        return (
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: placement,
                gap: '5px'
            }}>
                {
                    data.type === 'input' ? renderSources(objects as Source[]) : renderOperations(objects as Operation[])
                }
            </Box>
        );
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
                    {
                        renderInnerObjects(data, isTabletOrGreater)
                    }
                </CardActions>
            </Card>
            {
                data.type !== 'output' && <Handle type="source" position={Position.Bottom}/>
            }
        </div>
    );
}
