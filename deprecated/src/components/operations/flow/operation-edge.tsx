import { BaseEdge, EdgeProps, getStraightPath } from 'reactflow';

function OperationEdge(props: EdgeProps) {
    const { sourceX, sourceY, targetX, targetY } = props;

    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return <BaseEdge path={edgePath} {...props} />;
}

export default OperationEdge;
