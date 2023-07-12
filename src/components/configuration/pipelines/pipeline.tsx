import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Pipeline as PipelineType} from "../../../models/Pipeline";
import "reactflow/dist/style.css";
import "./style.css"
import ReactFlow, {Background, BackgroundVariant} from 'reactflow';
import {Accordion, AccordionSummary, AccordionDetails} from "./accordionElements";
import UnknownTemplate from "../../../assets/images/pipeline/unknown.jpg";
import {useMemo} from "react";
import {CustomNodeComponent} from "./customNode";


const examplePipeline: PipelineType = {
    id: '1',
    name: 'Lieferschein-Erfassung',
    description: 'Erfassung von Lieferscheinen jeglicher Art',
    created: '2023-07-12T12:00:00Z',
    templates: [{
        id: '1',
        name: 'Parameterextraktion',
        description: 'Extraktion von Parametern aus Lieferscheinen je nachdem welche wichtig sein, wer, von wo, wohin, was, wie viel, etc.',
        created: '2023-07-12T12:00:00Z',
        operations: [
        {
            id: '1',
            name: 'Parameterextraktion',
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
            name: 'Ergebnisumwandlung in Tabelle',
            type: 'transformation',
            created: '2023-07-12T12:00:00Z',
            operator: {
                id: '2',
                name: 'Ergebnisumwandlung in Tabelle',
                created: '2023-07-12T12:00:00Z',
                text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
            }
        }]
    },
        {
            id: '2',
            name: 'CSV-Export',
            created: '2023-07-12T12:00:00Z',
            operations: [{
                id: '3',
                name: 'CSV-Export',
                type: 'export',
                created: '2023-07-12T12:00:00Z',
                operator: 'data-transformer'
            }]

        }],
}

const pipelines: PipelineType[] = [examplePipeline];

export function Pipeline() {
    const [expanded, setExpanded] = React.useState<string | false>('1');
    const nodeTypes = useMemo(() => ({ customNode: CustomNodeComponent }), []);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
    };

    const createNodes = (pipeline: PipelineType) => {
        const nodes = pipeline.templates.map((template, index) => ({
            id: template.id,
            type: 'customNode',
            data: { title: template.name, image: UnknownTemplate, index: index },
            position: { x: 0, y: 170 * index }
        }));

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

    return (
        <div>
            {
                pipelines.map((pipeline) => {
                    return (
                        <Accordion key={pipeline.id} expanded={expanded === pipeline.id} onChange={handleChange(pipeline.id)}>
                            <AccordionSummary>
                                <Typography>{pipeline.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="react-flow-container">
                                    <ReactFlow nodeTypes={nodeTypes} nodes={createNodes(pipeline)} edges={createEdges(pipeline)} fitView>

                                    </ReactFlow>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </div>
    );
}
