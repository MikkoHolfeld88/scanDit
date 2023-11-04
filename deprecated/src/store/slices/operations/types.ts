import {Node, Edge} from "reactflow";

export type ReactFlowState = {
    nodes: Node[];
    edges: Edge[];
}

export interface OperationsState {
    flow: ReactFlowState;
}
