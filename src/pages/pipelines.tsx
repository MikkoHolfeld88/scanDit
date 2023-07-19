import "./style.css"
import {PipelineBuilder} from "../components/configuration/pipelines/pipelineBuilder";
import {PipelineViewer} from "../components/configuration/pipelines/pipelineViewer";
import React from "react";

export const Pipelines = () => {
    return (
        <div id="pipeline-management-container">
            <PipelineBuilder/>
            <PipelineViewer/>
        </div>
    );
}
