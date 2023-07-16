import * as React from 'react';
import {useEffect, useMemo} from 'react';
import ReactFlow, {Edge, EdgeChange, Node, NodeChange} from "reactflow";
import {useAppDispatch} from "../../../../store/store";
import {useSelector} from "react-redux";
import {selectEdges, selectNodes} from "../../../../store/slices/pipeline/selectors";
import {CustomNodeComponent} from "../desktop/customNode";
import {examplePipeline} from "../desktop/examplePipeline";
import {setEdges, setNodes} from "../../../../store/slices/pipeline/reducers";
import {setExpandedPipelineAccordion} from "../../../../store/slices/appConfig/reducers";
import {createEdges, createNodes} from "../desktop/pipeline";
import "./style.css"

export function TemplateMobileCard() {
    const dispatch = useAppDispatch();
    const nodes: Node[] = useSelector(selectNodes);
    const edges: Edge[] = useSelector(selectEdges);
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
    );
}
