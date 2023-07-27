import React from "react";
import {TemplateHeader} from "../components/configuration/templates/templateHeader";
import {TemplateCards} from "../components/configuration/templates/templateCards";

export const Templates = () => {
    return (
        <React.Fragment>
            <TemplateHeader/>
            <TemplateCards />
        </React.Fragment>

    );
}
