import {Edge, Node} from "reactflow";
import {Pipeline} from "../../../models/Pipeline";

export interface PipelineState {
    nodes: Node[],
    edges: Edge[],
    pipelines: Pipeline[]
}

