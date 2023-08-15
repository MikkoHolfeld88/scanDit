import {Pipeline} from "../models/Pipeline";
import {Node} from "reactflow";
import {Edge} from "reactflow";
import {TemplateRelation} from "../models/TemplateRelation";

export const createNodesFromPipeline = (pipeline: Pipeline): Node[] => {
    const templates = pipeline.templates;

    return [];
}

export const createEdgesFromPipeline = (pipeline: Pipeline): Edge[] => {

    return [];
}

export const createNodesFromTemplateRelations = (templateRelations: TemplateRelation[]): Node[] => {
    return [];
}

export const createEdgesFromTemplateRelations = (templateRelations: TemplateRelation[]): Edge[] => {

    return [];
}
