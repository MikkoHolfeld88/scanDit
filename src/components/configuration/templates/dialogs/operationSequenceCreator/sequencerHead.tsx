import {Col, Container, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import React from "react";

export const SequencerHead = () => {
    return (
        <Container>
            <Row style={{textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                <Col>
                    <Typography variant="button">Operation-Pool</Typography>
                </Col>
                <Col>
                    <Typography variant="button">Template-Operations</Typography>
                </Col>
            </Row>
        </Container>
        )

}
