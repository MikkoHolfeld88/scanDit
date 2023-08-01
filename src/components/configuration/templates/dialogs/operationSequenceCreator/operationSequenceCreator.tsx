import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {Container, Row} from "react-bootstrap";
import {DialogTransition} from "../../../../layout/transitions/dialogTransition";
import {Template} from "../../../../../models/Template";
import {OPERATION_SEQUENCE_FIELD, Sequencer} from "./sequencer";
import {useCallback, useEffect, useReducer, useState} from "react";
import {Operation} from "../../../../../models/Operation";
import {useSelector} from "react-redux";
import {selectOperations} from "../../../../../store/slices/operations/selectors";
import {produce} from "immer";
import {AppDispatch, useAppDispatch} from "../../../../../store/store";
import {saveTemplateOperations} from "../../../../../store/slices/template/reducers";
import {OperationEditDialog} from "../../../operations/dialogs/operationEditDialog";

/**
 * Remove all characters after the first underscore in a string.
 *
 * @param {string} str - The original string.
 * @return {string} The modified string without characters after the first underscore.
 */
function removeAfterFirstUnderscore(str: string) {
    let pos = str.indexOf('_');
    if (pos !== -1) {
        str = str.substring(0, pos);
    }
    return str;
}

interface OperationSequenceCreatorProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    template: Template | undefined;
}

export const OperationSequenceCreator = (props: OperationSequenceCreatorProps) => {
    const dispatchToRedux: AppDispatch = useAppDispatch();
    const operations: Operation[] = useSelector(selectOperations);
    const [operationId, setOperationId] = useState<string>("");
    const [openOperationEditDialog, setOpenOperationEditDialog] = useState<boolean>(false);

    const dragReducer = produce((draft, action) => {
        switch (action.type) {
            case "UPDATE_POOL_OPERATIONS": {
                draft[OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS] = action.payload;
                break;
            }
            case "UPDATE_TEMPLATE_OPERATIONS": {
                console.log(action.payload);
                draft[OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS] = action.payload;
                break;
            }

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
        [OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS]: operations.map((operation: Operation) => {
            return operation;
        }),
        [OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS]: props.template?.operations || [],
        cloneCounter: 0,
    });

    useEffect(() => {
        dispatch({
            type: "UPDATE_POOL_OPERATIONS",
            payload: operations.map((operation: Operation) => {
                return operation;
            })
        });
    }, [operations]);

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

    const handlePoolOperationClick = (operationId: string) => {
        setOperationId(removeAfterFirstUnderscore(operationId));
        setOpenOperationEditDialog(true);
    }

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSave = () => {
        if (!props.template?.id) {
            console.error("Template id is not defined. Aborting save operations to template.");
            return;
        }
        dispatchToRedux(saveTemplateOperations({id: props.template.id, operations: state[OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS]}));
        props.setOpen(false);
    }

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={DialogTransition}>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Container>
                        <Row>
                            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                {`Operation composer`}
                            </Typography>
                        </Row>
                        <Row>
                            <Typography sx={{ml: 2, flex: 1}} variant="caption" component="div">
                                {props.template?.name}
                            </Typography>
                        </Row>
                    </Container>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Sequencer
                template={props.template}
                state={state}
                dispatch={dispatch}
                handleDragEnd={handleDragEnd}
                handlePoolOperationClick={handlePoolOperationClick}
            />
            <OperationEditDialog
                open={openOperationEditDialog}
                setOpen={setOpenOperationEditDialog}
                operationId={operationId} />
        </Dialog>
    )
}


