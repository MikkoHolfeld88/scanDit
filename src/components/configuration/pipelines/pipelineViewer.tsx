import React, {useEffect} from "react";
import 'reactflow/dist/style.css';
import {Controls, MiniMap, ReactFlow, useEdgesState, useNodesState, Node} from "reactflow";
import {useSelector} from "react-redux";
import {selectPipelineById} from "../../../store/slices/pipeline/selectors";
import {Pipeline} from "../../../models/Pipeline";
import {RootState} from "../../../store/store";
import {createEdgesFromPipeline, createNodesFromPipeline} from "../../../services/pipelineNodeMappingService";
import {nodeTypes} from "./nodes/nodeTypes";
import {NODE_TYPE} from "../../../enums/nodeType.enum";

interface PipelineViewerProps {
    pipelineId: string;
}

export const PipelineViewer = (props: PipelineViewerProps) => {
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    const pipeline: Pipeline | undefined = useSelector((state: RootState) => selectPipelineById(state, props.pipelineId));

    useEffect(() => {
        update();
    }, [pipeline]);

    const update = () => {
        if (!pipeline) {
            return;
        }

        const updatedNodes = createNodesFromPipeline(pipeline);
        const updatedEdges = createEdgesFromPipeline(pipeline);

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
