import * as React from 'react';
import {useEffect, useMemo} from 'react';
import Typography from '@mui/material/Typography';
import {Pipeline as PipelineType} from "../../../models/Pipeline";
import "reactflow/dist/style.css";
import "./style.css"
import ReactFlow, {Edge, EdgeChange, Node, NodeChange} from 'reactflow';
import {Accordion, AccordionDetails, AccordionSummary} from "./accordionElements";
import {CustomNodeComponent} from "./customNode";
import {useSelector} from "react-redux";
import {selectEdges, selectNodes} from "../../../store/slices/pipeline/selectors";
import {useAppDispatch} from "../../../store/store";
import {setEdges, setNodes} from "../../../store/slices/pipeline/reducers";
import {selectExpandedPipelineAccordion} from "../../../store/slices/appConfig/selectors";
import {setExpandedPipelineAccordion} from "../../../store/slices/appConfig/reducers";

const examplePipeline: PipelineType = {
    id: '1',
    name: 'Lieferschein-Erfassung',
    description: 'Erfassung von Lieferscheinen jeglicher Art',
    created: '2023-07-12T12:00:00Z',
    templates: [
        {
            id: '1',
            name: 'Datenimport',
            type: 'input',
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'prepare-data',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        id: '1',
                        name: 'Datenimport',
                        created: '2023-07-12T12:00:00Z',
                        text: "Importiere die Daten aus dem Lieferschein und bereite sie für die weitere Verarbeitung vor."
                    }
                }]
        },
        {
            id: '2',
            name: 'Parameterextraktion',
            type: 'process',
            description: 'Extraktion von Parametern aus Lieferscheinen je nachdem welche wichtig sein, wer, von wo, wohin, was, wie viel, etc.',
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'key-value-extraction',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        id: '1',
                        name: 'Lieferschein-Analyse und Zusammenfassung',
                        created: '2023-07-12T12:00:00Z',
                        text: "Analysiere den Lieferschein und extrahiere alles was wirtschaftlich relevant ist in kurzen sauberen Sätzen und lasse keine wichtigen Daten aus!"
                    }
                },
                {
                    id: '2',
                    type: 'transform-to-csv',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        id: '2',
                        name: 'Ergebnisumwandlung in Tabelle',
                        created: '2023-07-12T12:00:00Z',
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '2',
                    type: 'transform-to-xlsx',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        id: '2',
                        name: 'Ergebnisumwandlung in Tabelle',
                        created: '2023-07-12T12:00:00Z',
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
            ]
        },
        {
            id: '3',
            name: 'CSV-Export',
            type: 'output',
            created: '2023-07-12T12:00:00Z',
            operations: [{
                id: '1',
                type: 'export',
                created: '2023-07-12T12:00:00Z',
                operator: 'file-download'
            }]
        }
    ],
}

const pipelines: PipelineType[] = [examplePipeline];

const createNodes = (pipeline: PipelineType) => {
    const nodes = pipeline.templates.map((template, index) => {
        return {
            id: template.id,
            type: 'customNode',
            data: {
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

const createEdges = (pipeline: PipelineType) => {
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
                        <Accordion key={pipeline.id} expanded={expanded === pipeline.id}
                                   onChange={handleExpandedChange(pipeline.id)}>
                            <AccordionSummary>
                                <Typography variant="h6">{pipeline.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
