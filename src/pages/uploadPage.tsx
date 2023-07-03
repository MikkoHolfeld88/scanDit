import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Upload} from "../components/upload";

export const UploadPage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Upload />
                </Col>
            </Row>
        </Container>
    );
}
