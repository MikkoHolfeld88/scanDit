import React, {useEffect} from "react";
import 'reactflow/dist/style.css';
import {Controls, MiniMap, Position, ReactFlow, useEdgesState, useNodesState} from "reactflow";
import {useSelector} from "react-redux";
import {selectEdges, selectNodes} from "../../../store/slices/pipeline/selectors";

export const PipelineViewer = () => {
    const nodes = useSelector(selectNodes);
    const edges = useSelector(selectEdges);

    useEffect(() => {

    }, []);



    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            attributionPosition="bottom-left">
            <Controls />
            <MiniMap />
        </ReactFlow>
    )
}
