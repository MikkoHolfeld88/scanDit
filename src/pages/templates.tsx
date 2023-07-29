import React from "react";
import {TemplateHeader} from "../components/configuration/templates/templateHeader";
import {TemplateCards} from "../components/configuration/templates/templateCards";
import {Divider} from "@mui/material";

export const Templates = () => {
    return (
        <React.Fragment>
            <TemplateHeader/>

            <Divider/>

            <TemplateCards/>

        </React.Fragment>
    );
}
