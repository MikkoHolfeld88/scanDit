import {File} from "../../../models/File";
import {Edge, Node} from "reactflow";

export interface PipelineState {
    nodes: Node[],
    edges: Edge[],
}
