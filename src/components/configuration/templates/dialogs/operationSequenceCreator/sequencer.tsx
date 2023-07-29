import React, {useState} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const Sequencer = () => {
    const [pool, setPool] = useState(['Operation1', 'Operation2', 'Operation3', 'Operation4', 'Operation5']);
    const [list, setList] = useState<string[]>([]);

    const handleDragEnd = (result: { destination: any; source: any; draggableId: string; }) => {
        const { destination, source, draggableId } = result;

        if (!destination) return; // Wenn das Element nirgendwo hingelegt wurde, machen wir nichts.

        if (destination.droppableId === 'list') {
            setList(old => [...old, draggableId]); // Fügen Sie das Element zur Liste hinzu.
        }
    };

    return (
        <DragDropContext  onDragEnd={handleDragEnd}>
            <Droppable droppableId="pool">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{margin: "1rem", padding: "1rem", backgroundColor: "#f0f0f0"}}>
                        <h2>Pool</h2>
                        {pool.map((item, index) => (
                            <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            margin: "0.5rem",
                                            padding: "0.5rem",
                                            backgroundColor: snapshot.isDragging ? "#a0a0a0" : "#d0d0d0",
                                            transform: snapshot.isDragging ? provided.draggableProps.style?.transform : "none"
                                        }}
                                    >
                                        {item}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId="list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{margin: "1rem", padding: "1rem", backgroundColor: "#f0f0f0"}}>
                        <h2>List</h2>
                        {list.map((item, index) => (
                            <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            margin: "0.5rem",
                                            padding: "0.5rem",
                                            backgroundColor: snapshot.isDragging ? "#a0a0a0" : "#d0d0d0",
                                            transform: snapshot.isDragging ? provided.draggableProps?.style?.transform : "none"
                                        }}
                                    >
                                        {item}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
