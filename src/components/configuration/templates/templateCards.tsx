import {useSelector} from "react-redux";
import {selectSearchValue, selectTemplates} from "../../../store/slices/template/selectors";
import {Template} from "../../../models/Template";
import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {TemplateCard} from "./templateCard";
import "./style.css"
import {TemplateSortingType} from "../../../models/TemplateSortingType";
import {selectTemplateSorting} from "../../../store/slices/appConfig/selectors";
import {TEMPLATE_SORTING} from "../../../enums/teplateSorting.enum";

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


    return (
        <Container>
            <Row>
                {
                    sortedTemplates && sortedTemplates.map((template, index) => {
                        if (templateSearch){
                            if (templateSearch.toLowerCase() === template.name.toLowerCase()){
                                return (
                                    <Col xs="3" sm="3" md="3" lg="5" xl="6" className="template-card-cols">
                                        <TemplateCard template={template} />
                                    </Col>
                                )
                            } else {
                                return null;
                            }
                        }

                        return (
                            <Col xs="3" sm="3" md="3" lg="5" xl="6" className="template-card-cols">
                                <TemplateCard template={template} />
                            </Col>
                        )
                    })
                }

            </Row>
        </Container>
    );
}
