import * as React from 'react';
import {useEffect, useMemo} from 'react';
import ReactFlow, {Controls, Edge, Node} from "reactflow";
import {useAppDispatch} from "../../../../store/store";
import {useSelector} from "react-redux";
import {selectEdges, selectNodes} from "../../../../store/slices/pipeline/selectors";
import {CustomNodeComponent} from "../node-types/customNode";
import {examplePipeline} from "../desktop/examplePipeline";
import {setEdges, setNodes} from "../../../../store/slices/pipeline/reducers";
import {createEdges, createNodes} from "../desktop/pipeline";
import "./style.css"
import {NODE_TYPE} from "../../../../enums/nodeType.enum";
import {AddTemplateNode} from "../node-types/addTemplateNode";

export function TemplateMobileCard() {
    const dispatch = useAppDispatch();
    const edges: Edge[] = useSelector(selectEdges);
    const nodes: Node[] = useSelector(selectNodes);
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

    return (
        <div className="react-flow-container">
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                fitView>
                <Controls/>
            </ReactFlow>
        </div>
    );
}
