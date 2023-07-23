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
import {CreateTemplateMenu} from "./createTemplateMenu";

interface PipelineBuilderProps {
    pipelineId: string;
    onNavigate: (direction: DIRECTIONS) => void;
}

export const PipelineBuilder = (props: PipelineBuilderProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const createButtonStyle = "contained";
    const arrowStyle = "text";

    const onNavigate = (direction: DIRECTIONS) => {
        props.onNavigate(direction);
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">

                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant={arrowStyle}
                                onClick={() => onNavigate(DIRECTIONS.UP_LEFT)}><NorthWestIcon/></Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant={arrowStyle} onClick={() => onNavigate(DIRECTIONS.UP)}><NorthIcon/></Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant={arrowStyle}
                                onClick={() => onNavigate(DIRECTIONS.UP_RIGHT)}><NorthEastIcon/></Button>
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
                        <Button variant={createButtonStyle} onClick={handleClick}><AddIcon/></Button>
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
                        <Button variant={arrowStyle}
                                onClick={() => onNavigate(DIRECTIONS.DOWN_LEFT)}><SouthWest/></Button>
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
            <CreateTemplateMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} handleClick={handleClick}
                                handleClose={handleClose}/>
        </React.Fragment>

    )
}
