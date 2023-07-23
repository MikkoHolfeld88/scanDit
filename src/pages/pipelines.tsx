import React from "react";
import {PipelineList} from "../components/configuration/pipelines/pipelineList";
import "./style.css"

export const Pipelines = () => {
    return (
        <div id="pipeline-management-container">
            <PipelineList/>
        </div>
    );
}
