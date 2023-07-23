import "./style.css"
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import SouthIcon from '@mui/icons-material/South';
import {SouthWest} from "@mui/icons-material";
import WestIcon from '@mui/icons-material/West';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import NorthIcon from '@mui/icons-material/North';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import EastIcon from '@mui/icons-material/East';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import AddIcon from '@mui/icons-material/Add';
import {DIRECTIONS} from "../../../enums/directions.enum";

interface PipelineBuilderProps {
    onCreate: () => void;
    onNavigate: (direction: DIRECTIONS) => void;
}

export const PipelineBuilder = (props: PipelineBuilderProps) => {
    const createButtonStyle = "contained";
    const arrowStyle = "text";

    const onNavigate = (direction: DIRECTIONS) => {
        props.onNavigate(direction);
    }

    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">

                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.UP_LEFT)}><NorthWestIcon/></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.UP)}><NorthIcon/></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.UP_RIGHT)}><NorthEastIcon/></Button>
                </Col>
                <Col className="d-flex justify-content-center">

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">

                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.LEFT)}><WestIcon/></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={createButtonStyle} onClick={props.onCreate}><AddIcon /></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.RIGHT)}><EastIcon/></Button>
                </Col>
                <Col className="d-flex justify-content-center">

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">

                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.DOWN_LEFT)}><SouthWest/></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.DOWN)}><SouthIcon/></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.DOWN_RIGHT)}><SouthEastIcon/></Button>
                </Col>
                <Col className="d-flex justify-content-center">

                </Col>
            </Row>
        </Container>
    )
}
