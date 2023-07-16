import * as React from 'react';
import {useEffect, useMemo} from 'react';
import Typography from '@mui/material/Typography';
import {Pipeline as PipelineType} from "../../../../models/Pipeline";
import "reactflow/dist/style.css";
import "./style.css"
import ReactFlow, {Edge, EdgeChange, Node, NodeChange} from 'reactflow';
import {Accordion, AccordionDetails, AccordionSummary} from "./accordionElements";
import {CustomNodeComponent} from "./customNode";
import {useSelector} from "react-redux";
import {selectEdges, selectNodes} from "../../../../store/slices/pipeline/selectors";
import {useAppDispatch} from "../../../../store/store";
import {setEdges, setNodes} from "../../../../store/slices/pipeline/reducers";
import {selectExpandedPipelineAccordion} from "../../../../store/slices/appConfig/selectors";
import {setExpandedPipelineAccordion} from "../../../../store/slices/appConfig/reducers";
import {examplePipeline} from "./examplePipeline";

const pipelines: PipelineType[] = [examplePipeline];

export const createNodes = (pipeline: PipelineType) => {
    const nodes = pipeline.templates.map((template, index) => {
        return {
            id: template.id,
            type: 'customNode',
            data: {
                sources: template.sources,
                title: template.name,
                index: index,
                operations: template.operations,
                type: template.type,
                id: template.id
            },
            position: {x: 0, y: 0},
            height: undefined
        };
    });

    return nodes;
};

export const createEdges = (pipeline: PipelineType) => {
    const edges = [];
    for (let index = 0; index < pipeline.templates.length - 1; index++) {
        const sourceTemplate = pipeline.templates[index];
        const targetTemplate = pipeline.templates[index + 1];

        edges.push({
            id: `e${sourceTemplate.id}-${targetTemplate.id}`,
            source: sourceTemplate.id,
            target: targetTemplate.id,
        });
    }

    return edges;
};

export function Pipeline() {
    const dispatch = useAppDispatch();
    const nodes: Node[] = useSelector(selectNodes);
    const edges: Edge[] = useSelector(selectEdges);
    const expanded: string = useSelector(selectExpandedPipelineAccordion)
    const nodeTypes = useMemo(() => ({customNode: CustomNodeComponent}), []);

    useEffect(() => {
        const initialNodes: Node[] = createNodes(examplePipeline);
        const initialEdges: Edge[] = createEdges(examplePipeline);

        dispatch(setNodes(initialNodes));
        dispatch(setEdges(initialEdges));
    }, []);

    const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        dispatch((setExpandedPipelineAccordion(newExpanded ? panel : false)));
    };

    const handleNodeChange = (nodeChanges: NodeChange[]) => {

    }

    const handleEdgeChange = (edgeChanges: EdgeChange[]) => {

    }

    return (
        <React.Fragment>
            {
                pipelines.map((pipeline, index) => {
                    return (
                        <Accordion
                            key={pipeline.id}
                            expanded={expanded === pipeline.id}
                            onChange={handleExpandedChange(pipeline.id)}>
                            <AccordionSummary>
                                <Typography variant="h6">{pipeline.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{padding: 0}}>
                                <div className="react-flow-container">
                                    <ReactFlow
                                        nodeTypes={nodeTypes}
                                        onNodesChange={(node) => handleNodeChange(node)}
                                        onEdgesChange={(edge) => handleEdgeChange(edge)}
                                        nodes={nodes}
                                        edges={edges}
                                        fitView>
                                    </ReactFlow>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </React.Fragment>
    );
}
