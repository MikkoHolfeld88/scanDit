import {Col, Container, Row} from "react-bootstrap";
import {TemplateSearch} from "./templateSearch";
import {TemplateSorter} from "./templateSorter";
import {TemplateButton} from "./templateButton";
import React from "react";

export const TemplateHeader = () => {
    return (
        <Container style={{minHeight: "150px", backgroundColor: "white"}}>
            <Row style={{margin: "5px 0 5px 0"}}>
                <TemplateSearch />
            </Row>

            <Row>
                <Col style={{marginTop: "15px"}}>
                    <TemplateSorter />
                </Col>
                <Col>
                    <TemplateButton />
                </Col>
            </Row>
        </Container>
    )
}
