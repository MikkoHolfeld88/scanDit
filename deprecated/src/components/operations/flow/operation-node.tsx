import { Handle, NodeProps, Position } from 'reactflow';

export type NodeData = {
    label: string;
};

function OperationNode({ id, data }: NodeProps<NodeData>) {
    return (
        <>
            <input defaultValue={data.label} />

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
}

export default OperationNode;
