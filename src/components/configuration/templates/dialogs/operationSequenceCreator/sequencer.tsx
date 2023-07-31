import React, {useCallback, useReducer} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {produce} from "immer";
import "./style.css"
import {useSelector} from "react-redux";
import {selectOperations} from "../../../../../store/slices/operations/selectors";
import {Operation} from "../../../../../models/Operation";
import {Template} from "../../../../../models/Template";
import {SequencerHead} from "./sequencerHead";

enum OPERATION_SEQUENCE_FIELD {
    POOL_OPERATIONS = "poolOperations",
    TEMPLATE_OPERATIONS = "templateOperations"
}

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
                if (action.from === OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS && action.to === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS) {
                    const original = draft[action.from][action.fromIndex];
                    draft.cloneCounter++;
                    const clone = {...original, id: original.id + "_clone_" + draft.cloneCounter}; // Append the counter to the id
                    draft[action.to].splice(action.toIndex, 0, clone);
                } else if (action.from === OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS && action.to === OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS) {
                    return;
                } else if (action.from === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS && action.to === OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS) {
                    draft[action.from].splice(action.fromIndex, 1);
                } else if (action.from === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS && action.to === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS) {
                    const [moved] = draft[action.from].splice(action.fromIndex, 1);
                    draft[action.to].splice(action.toIndex, 0, moved);
                }
            }
        }
    });

    const [state, dispatch] = useReducer(dragReducer, {
        [OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS]: itemsFromInitialState, // operations
        [OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS]: items2FromInitialState, //props.template.operations
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

    return (
        <React.Fragment>
            <SequencerHead />

            <div id="sequence-container" className="sequence-container">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId={OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS} type="OPERATION">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"dropper" + (snapshot.isDraggingOver ? " dropOver" : "")}>
                                    {state.poolOperations?.map((operation: any, index: any) => {
                                        return (
                                            <Draggable key={operation.id + "_pool_" + index} draggableId={operation.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div>
                                                        {/* Deine normale Dragger-Komponente, die immer angezeigt wird */}
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={"dragger" + (snapshot.isDragging ? " dragging" : "")}>
                                                            <div className="draggerContent">
                                                                <img src={operation.icon} className="draggerIconPool"/>
                                                                <span>
                                                            {operation.name.first} {operation.name.last}
                                                          </span>
                                                            </div>
                                                        </div>
                                                        {/* Die Klon-Komponente, die nur angezeigt wird, wenn das Element gezogen wird */}
                                                        {snapshot.isDragging && (
                                                            <div className="dragger dragging">
                                                                <div className="draggerContent">
                                                                    <img src={operation.icon} className="draggerIconPool"/>
                                                                    <span>
                                                                  {operation.name.first} {operation.name.last}
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
                    <Droppable droppableId={OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS} type="OPERATION">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"dropper" + (snapshot.isDraggingOver ? " dropOver" : "")}>
                                    {state.templateOperations?.map((operation: any, index: number) => {
                                        console.log(`id: ${operation.id}, index: ${index}`);
                                        return (
                                            <Draggable key={operation.id + "_list_" + index} draggableId={operation.id} index={index}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            className={"dragger" + (snapshot.isDragging ? " dragging" : "")}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <div className="draggerContent">
                                                                <img
                                                                    src={operation.icon}
                                                                    className="draggerIconList"/>
                                                                <span>
                                                                    {operation.name.first} {operation.name.last}
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
