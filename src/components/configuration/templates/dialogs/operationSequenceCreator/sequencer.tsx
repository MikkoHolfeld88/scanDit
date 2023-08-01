import React from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import "./style.css"
import {Template} from "../../../../../models/Template";
import {SequencerHead} from "./sequencerHead";

export enum OPERATION_SEQUENCE_FIELD {
    POOL_OPERATIONS = "poolOperations",
    TEMPLATE_OPERATIONS = "templateOperations"
}

interface SequencerProps {
    template: Template | undefined;
    state: any;
    dispatch: React.Dispatch<any>;
    handleDragEnd: (result: any) => void;
    handlePoolOperationClick: (operationId: string) => void;
}

export const Sequencer = (props: SequencerProps) => {
    return (
        <React.Fragment>
            <SequencerHead/>

            <div id="sequence-container" className="sequence-container">
                <DragDropContext onDragEnd={props.handleDragEnd}>
                    <Droppable droppableId={OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS} type="OPERATION">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"dropper" + (snapshot.isDraggingOver ? " dropOver" : "")}>
                                    {props.state.poolOperations?.map((operation: any, index: any) => {
                                        return (
                                            <Draggable key={operation.id + "_pool_" + index} draggableId={operation.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div>
                                                        {/* Deine normale Dragger-Komponente, die immer angezeigt wird */}
                                                        <div
                                                            onClick={() => props.handlePoolOperationClick(operation.id)}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={"dragger" + (snapshot.isDragging ? " dragging" : "")}>
                                                            <div className="draggerContent">
                                                                <img src={operation.icon} className="draggerIconPool"/>
                                                                <span>
                                                                    {operation.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* Die Klon-Komponente, die nur angezeigt wird, wenn das Element gezogen wird */}
                                                        {snapshot.isDragging && (
                                                            <div className="dragger dragging">
                                                                <div className="draggerContent">
                                                                    <img src={operation.icon}
                                                                         className="draggerIconPool"/>
                                                                    <span>
                                                                        {operation.name}
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
                                    {props.state.templateOperations?.map((operation: any, index: number) => {
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
                                                                    {operation.name}
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
