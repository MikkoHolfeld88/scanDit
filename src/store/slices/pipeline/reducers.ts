import {PipelineState} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {NODE_TYPE} from "../../../enums/nodeType.enum";
import {Pipeline} from "../../../models/Pipeline";

const initialPipeline: Pipeline = {
    id: 'initial',
    name: 'Test pipeline',
    created: new Date().toISOString(),
    icon: 'https://www.flaticon.com/svg/static/icons/svg/1828/1828884.svg',
    templates: [
        {
            id: 'add_template_node_button',
            name: NODE_TYPE.ADD_TEMPLATE_NODE,
            type: 'process',
            created: new Date().toISOString()
        }
    ]
}

const initialState: PipelineState = {
    nodes: [],
    edges: [],
    pipelines: [initialPipeline, initialPipeline, initialPipeline, initialPipeline, initialPipeline, initialPipeline, initialPipeline, initialPipeline, initialPipeline, initialPipeline, initialPipeline],
}

export const pipelineSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {
        setNodes: (state, action) => {
            state.nodes = action.payload;
        },
        setEdges: (state, action) => {
            state.edges = action.payload;
        },
        updateNodeDimensions: (state, action) => {
            const node = state.nodes.find(node => node.id === action.payload.nodeId);

            if (node) {
                node.width = action.payload.width;
                node.height = action.payload.height;
            }
        },
        centerNodesHorizontally: (state) => {
            const maxWidth = state.nodes.reduce((maxWidth, node) => Math.max(maxWidth, node.width || 0), 0);
            state.nodes.forEach(node => {
                node.position.x = (maxWidth - (node.width || 0)) / 2;
            });
        },
        centerNodesVertically: (state) => {
            const margin: number = 50;
            state.nodes.forEach((node, index) => {
                const heightBefore: number = state.nodes.slice(0, index).reduce((acc, node) => acc + (node.height || 0), 0);
                node.position.y = heightBefore + margin * index;
            });
        },
        setPipelines: (state, action) => {
            state.pipelines = action.payload;
        },
        addPipeline: (state, action) => {
            state.pipelines.push(action.payload);
        },
        editPipelineName: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.name = action.payload.name;
            }
        },
        editPipelineDescription: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.description = action.payload.description;
            }
        },
        editPipelineIcon: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.id);
            if (pipeline) {
                pipeline.icon = action.payload.icon;
            }
        },
        deletePipeline: (state, action) => {
            state.pipelines = state.pipelines.filter(pipeline => pipeline.id !== action.payload);
        },
        addTemplate: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                pipeline.templates.push(action.payload.template);
            }
        },
        editTemplateName: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template) {
                    template.name = action.payload.name;
                }
            }
        },
        editTemplateDescription: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template) {
                    template.description = action.payload.description;
                }
            }
        },
        editTemplateType: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template) {
                    template.type = action.payload.type;
                }
            }
        },
        editTemplateSources: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template) {
                    template.sources = action.payload.sources;
                }
            }
        },
        editTemplateTargets: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template) {
                    template.targets = action.payload.targets;
                }
            }
        },
        removeTemplate: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                pipeline.templates = pipeline.templates.filter(template => template.id !== action.payload.templateId);
            }
        },
        addOperation: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template && template.operations) {
                    template.operations.push(action.payload.operation);
                }
            }
        },
        editOperationType: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template && template.operations) {
                    const operation = template.operations.find(operation => operation.id === action.payload.operationId);
                    if (operation) {
                        operation.type = action.payload.type;
                    }
                }
            }
        },
        editOperationDescription: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template && template.operations) {
                    const operation = template.operations.find(operation => operation.id === action.payload.operationId);
                    if (operation) {
                        operation.description = action.payload.description;
                    }
                }
            }
        },
        editPromptText: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template && template.operations) {
                    const operation = template.operations.find(operation => operation.id === action.payload.operationId);
                    if (operation && operation.operator.type === 'prompt') {
                        operation.operator.text = action.payload.text;
                    }
                }
            }
        },
        removeOperation: (state, action) => {
            const pipeline = state.pipelines.find(pipeline => pipeline.id === action.payload.pipelineId);
            if (pipeline) {
                const template = pipeline.templates.find(template => template.id === action.payload.templateId);
                if (template && template.operations) {
                    template.operations = template.operations.filter(operation => operation.id !== action.payload.operationId);
                }
            }
        }
    }
});

export const {setNodes, setEdges, updateNodeDimensions, centerNodesHorizontally, centerNodesVertically, deletePipeline} = pipelineSlice.actions;

export default pipelineSlice.reducer;
