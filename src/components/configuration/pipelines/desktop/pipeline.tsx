import * as React from 'react';
import {useEffect, useMemo} from 'react';
import Typography from '@mui/material/Typography';
import {Pipeline as PipelineType} from "../../../../models/Pipeline";
import "reactflow/dist/style.css";
import "./style.css"
import ReactFlow, {Controls, Edge, MarkerType, Node} from 'reactflow';
import {Accordion, AccordionDetails, AccordionSummary} from "./accordionElements";
import {CustomNodeComponent} from "../node-types/customNode";
import {useSelector} from "react-redux";
import {selectEdges, selectNodes} from "../../../../store/slices/pipeline/selectors";
import {useAppDispatch} from "../../../../store/store";
import {setEdges, setNodes} from "../../../../store/slices/pipeline/reducers";
import {selectExpandedPipelineAccordion} from "../../../../store/slices/appConfig/selectors";
import {setExpandedPipelineAccordion} from "../../../../store/slices/appConfig/reducers";
import {examplePipeline} from "./examplePipeline";
import {NODE_TYPE} from "../../../../enums/nodeType.enum";
import {AddTemplateNode} from "../node-types/addTemplateNode";

const pipelines: PipelineType[] = [examplePipeline];

export const createNodes = (pipeline: PipelineType) => {
    return pipeline.templates.map((template, index) => {
        return {
            id: template.id,
            type: template.name === NODE_TYPE.ADD_TEMPLATE_NODE ? NODE_TYPE.ADD_TEMPLATE_NODE : NODE_TYPE.CUSTOM_NODE,
            data: {
                sources: template.sources,
                title: template.name,
                index: index,
                operations: template.operations,
                type: template.type,
                id: template.id
            },
            draggable: true,
            position: {x: 0, y: 0},
            height: undefined
        };
    });
};

export const createEdges = (pipeline: PipelineType) => {
    const edges = [];
    for (let index = 0; index < pipeline.templates.length - 1; index++) {
        const sourceTemplate = pipeline.templates[index];
        const targetTemplate = pipeline.templates[index + 1];

        // Check if the target template's name is 'ADD_TEMPLATE_NODE'
        if (targetTemplate.name === NODE_TYPE.ADD_TEMPLATE_NODE) {
            console.log("true");
            edges.push({
                id: `e${sourceTemplate.id}-${targetTemplate.id}`,
                source: sourceTemplate.id,
                target: targetTemplate.id,
                type: 'floating',
                animated: true,
                style: {
                    strokeWidth: 2,
                    stroke: 'linear-gradient(90deg, #d2d2d2 50%, transparent 50%)',
                    strokeDasharray: '1,1,1,1,1' // This creates a dashed line
                }
            });
        } else {
            edges.push({
                id: `e${sourceTemplate.id}-${targetTemplate.id}`,
                source: sourceTemplate.id,
                target: targetTemplate.id,
                type: 'floating',
                markerEnd: {
                    width: 20,
                    height: 20,
                    type: MarkerType.ArrowClosed,
                    color: '#000'
                },
                style: {
                    strokeWidth: 2,
                    stroke: '#000'
                }
            });
        }
    }

    return edges;
};

export function Pipeline() {
    const dispatch = useAppDispatch();
    const nodes: Node[] = useSelector(selectNodes);
    const edges: Edge[] = useSelector(selectEdges);
    const expanded: string = useSelector(selectExpandedPipelineAccordion)
    const nodeTypes = useMemo(() => ({
        [NODE_TYPE.CUSTOM_NODE]: CustomNodeComponent,
        [NODE_TYPE.ADD_TEMPLATE_NODE]: AddTemplateNode
    }), []);

    useEffect(() => {
        const initialNodes: Node[] = createNodes(examplePipeline);
        const initialEdges: Edge[] = createEdges(examplePipeline);

        dispatch(setNodes(initialNodes));
        dispatch(setEdges(initialEdges));
    }, []);

    const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        dispatch((setExpandedPipelineAccordion(newExpanded ? panel : false)));
    };

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
                                        nodes={nodes}
                                        edges={edges}
                                        fitView>
                                        <Controls/>
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
