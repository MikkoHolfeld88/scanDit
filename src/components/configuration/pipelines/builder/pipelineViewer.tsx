import React, {useEffect} from "react";
import 'reactflow/dist/style.css';
import {Controls, MiniMap, ReactFlow, useEdgesState, useNodesState} from "reactflow";
import {
    createEdgesFromTemplateRelations,
    createNodesFromTemplateRelations
} from "../../../../services/pipelineNodeMappingService";
import {nodeTypes} from "./nodes/nodeTypes";
import {TemplateRelation} from "../../../../models/TemplateRelation";

interface PipelineViewerProps {
    templateRelations: TemplateRelation[];
    setTemplateRelations: (templateRelations: TemplateRelation[]) => void;
}

export const PipelineViewer = (props: PipelineViewerProps) => {
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    useEffect(() => {
        console.log(props.templateRelations);
    }, [props.templateRelations]);

    const update = () => {
        if (!props.templateRelations) {
            return;
        }

        const updatedNodes = createNodesFromTemplateRelations(props.templateRelations);
        const updatedEdges = createEdgesFromTemplateRelations(props.templateRelations);

        setNodes(updatedNodes);
        setEdges(updatedEdges);
    };

    return (
        <ReactFlow
            fitView
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            attributionPosition="bottom-left">
            <Controls/>
            <MiniMap/>
        </ReactFlow>
    )
}
