import React from "react";
import {Container} from "react-bootstrap";

export const Home = () => {
    return (
        <div id="home" style={{textAlign: "center"}}>
            <Container fluid>
                <h1>Willkommen!</h1>
                <h2>Das ist eine Prototyping Version von scandit</h2>
                <h4>Hier werden Grundlagen Konzepte und Ideen prototypisch getestet und dem Team zum besseren
                    Verständnis zur Verfügung gestellt</h4>
            </Container>
        </div>
    );
}
