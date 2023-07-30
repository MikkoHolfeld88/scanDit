import React, {useCallback, useEffect, useReducer} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {produce} from "immer";
import "./style.css"
import {Col, Container, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {selectOperations} from "../../../../../store/slices/operations/selectors";
import {Operation} from "../../../../../models/Operation";
import {Template} from "../../../../../models/Template";

interface SequencerProps {
    template: Template | undefined;
}

export const Sequencer = (props: SequencerProps) => {
    const operations: Operation[] = useSelector(selectOperations);

    const itemsFromInitialState = [
        {
            id: '1',
            name: {
                first: 'John',
                last: 'Maverick'
            },
            icon: ""
        },
        {
            id: '2',
            name: {
                first: 'Mikko',
                last: 'Holyfield'
            },
            icon: ""
        },
        {
            id: '3',
            name: {
                first: 'Jeff',
                last: 'Los'
            },
            icon: ""
        }
    ]

    const items2FromInitialState: any = []

    const dragReducer = produce((draft, action) => {
        switch (action.type) {
            case "MOVE": {
                draft[action.to] = draft[action.to] || [];
                if (action.from === "poolOperations" && action.to === "templateOperations") {
                    const original = draft[action.from][action.fromIndex];
                    draft.cloneCounter++; // Increase the counter for every clone
                    const clone = {...original, id: original.id + "-clone" + draft.cloneCounter}; // Append the counter to the id
                    draft[action.to].splice(action.toIndex, 0, clone);
                } else if (action.from === "poolOperations" && action.to === "poolOperations") {
                    return;
                } else if (action.from === "templateOperations" && action.to === "poolOperations") {
                    draft[action.from].splice(action.fromIndex, 1);
                } else if (action.from === "templateOperations" && action.to === "templateOperations") {
                    const [moved] = draft[action.from].splice(action.fromIndex, 1);
                    draft[action.to].splice(action.toIndex, 0, moved);
                }
            }
        }
    });

    const [state, dispatch] = useReducer(dragReducer, {
        poolOperations: itemsFromInitialState, // operations
        templateOperations: items2FromInitialState, //props.template.operations
        cloneCounter: 0,
    });

    const handleDragEnd = useCallback((result: any) => {
        if (result.reason === "DROP") {
            if (!result.destination) {
                return;
            }
            dispatch({
                type: "MOVE",
                from: result.source.droppableId,
                to: result.destination.droppableId,
                fromIndex: result.source.index,
                toIndex: result.destination.index,
            });
        }
    }, []);

    const handlerDragStart = () => {
        console.log("drag start");
    }

    return (
        <React.Fragment>
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

            <div id="sequence-container" className="sequence-container">
                <DragDropContext onDragEnd={handleDragEnd} onDragStart={handlerDragStart}>
                    <Droppable droppableId="poolOperations" type="OPERATION">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"dropper" + (snapshot.isDraggingOver ? " dropOver" : "")}>
                                    {state.poolOperations?.map((person: any, index: any) => {
                                        return (
                                            <Draggable key={person.id + "_" + index} draggableId={person.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div>
                                                        {/* Deine normale Dragger-Komponente, die immer angezeigt wird */}
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={"dragger" + (snapshot.isDragging ? " dragging" : "")}>
                                                            <div className="draggerContent">
                                                                <img src={person.icon} className="draggerIconPool" />
                                                                <span>
                                                            {person.name.first} {person.name.last}
                                                          </span>
                                                            </div>
                                                        </div>
                                                        {/* Die Klon-Komponente, die nur angezeigt wird, wenn das Element gezogen wird */}
                                                        {snapshot.isDragging && (
                                                            <div className="dragger dragging">
                                                                <div className="draggerContent">
                                                                    <img src={person.icon} className="draggerIconPool" />
                                                                    <span>
                                                                  {person.name.first} {person.name.last}
                                                                </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                </div>
                            );
                        }}
                    </Droppable>
                    <Droppable droppableId="templateOperations" type="OPERATION">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"dropper" + (snapshot.isDraggingOver ? " dropOver" : "")}>
                                    {state.templateOperations?.map((person: any, index: number) => {
                                        console.log(`id: ${person.id}, index: ${index}`);
                                        return (
                                            <Draggable key={person.id + "_" + index} draggableId={person.id} index={index}>

                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            className={"dragger" + (snapshot.isDragging ? " dragging" : "")}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <div className="draggerContent">
                                                                <img
                                                                    src={person.icon}
                                                                    className="draggerIconList"/>
                                                                <span>
                                                                {person.name.first} {person.name.last}
                                                            </span>
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
            </div>
        </React.Fragment>


    )
}
