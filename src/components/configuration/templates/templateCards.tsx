import {useSelector} from "react-redux";
import {selectSearchValue, selectTemplates} from "../../../store/slices/template/selectors";
import {Template} from "../../../models/Template";
import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {TemplateCard} from "./templateCard";
import {TemplateSortingType} from "../../../models/TemplateSortingType";
import {selectTemplateSorting} from "../../../store/slices/appConfig/selectors";
import {getSortFunction} from "../../../services/templateSortingService";
import {Typography} from "@mui/material";
import {TEMPLATE_SORTING} from "../../../enums/templateSorting.enum";
import "./style.css"

export const TemplateCards = () => {
    const templates: Template[] = useSelector(selectTemplates)
    const templateSorting: TemplateSortingType = useSelector(selectTemplateSorting);
    const templateSearch: string | null = useSelector(selectSearchValue);

    const [sortedTemplates, setSortedTemplates] = React.useState<Template[]>([]);

    useEffect(() => {
        const sortFunction = getSortFunction(templateSorting);
        const newSortedTemplates = [...templates].sort(sortFunction);
        setSortedTemplates(newSortedTemplates);
    }, [templateSorting, templates]);

    const renderTemplates = (templates: Template[], templateSearch: string | null, templateSorting: TemplateSortingType): JSX.Element[] => {
        let lastGroupValue: string | null = null;

        return templates
            .map((template, index) => {
                let groupValue: string | null = null;

                if (templateSorting === TEMPLATE_SORTING.ALPHABETICALLY || templateSorting === TEMPLATE_SORTING.ALPHABETICALLY_REVERSE) {
                    groupValue = template.name.charAt(0).toUpperCase();
                } else if (templateSorting === TEMPLATE_SORTING.BY_TYPE || templateSorting === TEMPLATE_SORTING.BY_TYPE_REVERSE) {
                    groupValue = template.type;
                } else if (templateSorting === TEMPLATE_SORTING.BY_DATE || templateSorting === TEMPLATE_SORTING.BY_DATE_REVERSE) {
                    const date = template.updated ? new Date(template.updated) : new Date(template.created);
                    groupValue = date.toLocaleDateString();
                }

                let groupHeader = null;
                if (groupValue !== lastGroupValue) {
                    lastGroupValue = groupValue;
                    groupHeader = (
                        <Row className="group-header-template-cards">
                            <Typography variant="body2">
                                {
                                    groupValue
                                }
                            </Typography>
                        </Row>
                    );
                }

                if (templateSearch) {
                    if (templateSearch.toLowerCase() === template.name.toLowerCase()) {
                        return (
                            <React.Fragment key={index}>
                                {groupHeader}
                                <Col xs="3" sm="3" md="3" lg="5" xl="6" className="template-card-cols">
                                    <TemplateCard template={template} />
                                </Col>
                            </React.Fragment>
                        )
                    } else {
                        return null;
                    }
                }

                return (
                    <React.Fragment key={index}>
                        {groupHeader}
                        <Col xs="3" sm="3" md="3" lg="5" xl="6" className="template-card-cols">
                            <TemplateCard template={template} />
                        </Col>
                    </React.Fragment>
                )
            })
            .filter(templateElement => templateElement !== null) as JSX.Element[];
    }

    return (
        <Container>
            <Row>
                {
                    sortedTemplates && renderTemplates(sortedTemplates, templateSearch, templateSorting)
                }
            </Row>
        </Container>
    );
}
