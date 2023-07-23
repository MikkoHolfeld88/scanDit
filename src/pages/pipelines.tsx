import "./style.css"
import React from "react";
import {PipelineList} from "../components/configuration/pipelines/pipelineList";

export const Pipelines = () => {
    return (
        <div id="pipeline-management-container">
            <PipelineList/>
        </div>
    );
}
