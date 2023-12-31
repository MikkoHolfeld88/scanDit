import * as React from 'react';
import {useCallback, useEffect, useReducer, useState} from 'react';
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
import {Operation} from "../../../../../models/Operation";
import {useSelector} from "react-redux";
import {selectOperations} from "../../../../../store/slices/operations/selectors";
import {produce} from "immer";
import {AppDispatch, useAppDispatch} from "../../../../../store/store";
import {saveTemplateOperations} from "../../../../../store/slices/template/reducers";
import {OperationEditDialog} from "../../../operations/dialogs/operationEditDialog";
import {setAppMode, setConfigurationTab} from "../../../../../store/slices/appConfig/reducers";
import {APP_MODE} from "../../../../../enums/appMode.enum";
import {v4} from "uuid";
import {addOperation} from "../../../../../store/slices/operations/reducers";
import {OPERATION_TYPE} from "../../../../../enums/operationsTypes/operationType.enum";
import {selectAppMode} from "../../../../../store/slices/appConfig/selectors";
import {AppMode} from "../../../../../models/AppMode";

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
    const appMode: AppMode = useSelector(selectAppMode);
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
                draft[OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS] = action.payload;
                break;
            }
            case "MOVE": {
                draft[action.to] = draft[action.to] || [];

                // If the action is between pool operations and template operations
                if (action.from === OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS && action.to === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS) {
                    const original = draft[action.from][action.fromIndex];
                    draft.cloneCounter++;
                    const clone = {...original, id: original.id + "_clone_" + draft.cloneCounter};
                    draft[action.to].splice(action.toIndex, 0, clone);
                }
                // If the action is within template operations
                else if (action.from === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS && action.to === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS) {
                    const [moved] = draft[action.from].splice(action.fromIndex, 1);
                    draft[action.to].splice(action.toIndex, 0, moved);
                }
                // If the action is from template operations to pool operations
                else if (action.from === OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS && action.to === OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS) {
                    draft[action.from].splice(action.fromIndex, 1);
                }
                // For all other cases do nothing.
                else {
                    return;
                }
                break;
            }
            default: return draft;

        }
    });

    const [state, dispatch] = useReducer(dragReducer, {
        [OPERATION_SEQUENCE_FIELD.POOL_OPERATIONS]: operations.map((operation: Operation) => {
            return operation;
        }),
        [OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS]: props.template?.operations || [],
        cloneCounter: 0,
    });

    /**
     * Dieser `useEffect` Hook wird ausgeführt, wenn sich das `operations` Array ändert.
     *
     * Zuerst wird ein Dispatch zum Aktualisieren der `poolOperations` im Redux Store ausgeführt.
     * Die `poolOperations` werden dabei auf den aktuellen Stand des `operations` Arrays gesetzt.
     *
     * Anschließend wird geprüft, ob es Template-Operationen im aktuellen Zustand gibt. Falls ja,
     * wird für jede Template-Operation versucht, eine übereinstimmende Operation im `operations`
     * Array zu finden. Diese Übereinstimmung erfolgt anhand der `id` Eigenschaft, wobei davon
     * ausgegangen wird, dass die `id` einer Template-Operation möglicherweise mit `_clone_n`
     * modifiziert wurde. Daher wird die `removeAfterFirstUnderscore` Funktion verwendet, um
     * den Originaloperation-Id zu extrahieren.
     *
     * Wenn eine übereinstimmende Operation gefunden wird, werden die Eigenschaften der
     * Template-Operation und der übereinstimmenden Operation kombiniert und das resultierende
     * Objekt in die Liste der aktualisierten Template-Operationen eingefügt. Falls keine
     * übereinstimmende Operation gefunden wird, wird die ursprüngliche Template-Operation
     * unverändert in die Liste eingefügt.
     *
     * Schließlich wird ein Dispatch zum Aktualisieren der `templateOperations` im Redux Store
     * ausgeführt, wobei die `templateOperations` auf die Liste der aktualisierten Template-
     * Operationen gesetzt werden.
     */
    useEffect(() => {
        dispatch({
            type: "UPDATE_POOL_OPERATIONS",
            payload: operations.map((operation: Operation) => {
                return operation;
            })
        });

        if (state[OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS]) {
            const updatedTemplateOperations = state[OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS].map((templateOperation: Operation) => {
                const matchingOperation = operations.find(operation => operation.id === removeAfterFirstUnderscore(templateOperation.id));
                return matchingOperation ? {...templateOperation, ...matchingOperation} : templateOperation;
            });
            dispatch({
                type: "UPDATE_TEMPLATE_OPERATIONS",
                payload: updatedTemplateOperations
            });
        }
    }, [operations, props.open]);

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
        clearLocalStates();
    };

    const clearLocalStates = () => {
        dispatch({
            type: "UPDATE_TEMPLATE_OPERATIONS",
            payload: []
        });

        dispatch({
            type: "UPDATE_POOL_OPERATIONS",
            payload: []
        });
    }

    const handleSave = () => {
        if (!props.template?.id) {
            console.error("Template id is not defined. Aborting save operations to template.");
            return;
        }
        dispatchToRedux(saveTemplateOperations({
            id: props.template.id,
            operations: state[OPERATION_SEQUENCE_FIELD.TEMPLATE_OPERATIONS]
        }));
        props.setOpen(false);
    }

    const handleOperationCreation = () => {
        // Setting the app mode the correct way enables the user to get back to the correct tab
        // after the operation creation is finished.
        if (appMode === APP_MODE.TEMPLATE_CREATION_BY_PIPELINE_BUILDER){
            dispatchToRedux(setAppMode(APP_MODE.OPERATION_CREATION_BY_PIPELINE_BUILDER));
        } else {
            dispatchToRedux(setAppMode(APP_MODE.OPERATION_CREATION_FROM_TEMPLATE));
        }

        const newId = v4().toString();

        const newOperation: Operation = {
            id: newId,
            name: newId,
            description: '',
            created: new Date().toISOString(),
            author: '',
            icon: '',
            type: OPERATION_TYPE.EXTRACTION,
            prompt: ''
        }
        dispatchToRedux(addOperation(newOperation));

        props.setOpen(false);
        dispatchToRedux(setConfigurationTab(2));
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
            <Button
                variant="contained"
                style={{borderRadius: 0, marginTop: "10px"}}
                onClick={handleOperationCreation}>
                Create Operation
            </Button>
        </Dialog>
    )
}


