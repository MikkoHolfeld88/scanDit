import React from "react";
import {Image} from "primereact/image";
import mainProcess from "../assets/images/home/scandit_processes.png";
import {Col, Container, Row} from "react-bootstrap";

export const Home = () => {
    return (
        <div id="home" style={{textAlign: "center"}}>
            <h1>Basic Concept</h1>
            <Container fluid>
                <Row>
                    <Col>
                        <Image src={mainProcess} preview width="100%"/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
