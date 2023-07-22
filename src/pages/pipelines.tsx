import "./style.css"
import {PipelineBuilder} from "../components/configuration/pipelines/pipelineBuilder";
import {PipelineViewer} from "../components/configuration/pipelines/pipelineViewer";
import React from "react";
import {PipelineList} from "../components/configuration/pipelines/pipelineList";

export const Pipelines = () => {
    return (
        <div id="pipeline-management-container">
            <PipelineList />
        </div>
    );
}
