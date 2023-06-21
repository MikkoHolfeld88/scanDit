import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Button from "@mui/material/Button";

export const Upload = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Button variant="outlined" component="label">Upload</Button>
                </Col>
            </Row>
        </Container>
    );
}
