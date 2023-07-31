import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector} from "react-redux";
import {selectAppMode} from "../../../store/slices/appConfig/selectors";
import {AppMode} from "../../../models/AppMode";
import DeleteIcon from "@mui/icons-material/Delete";
import {APP_MODE} from "../../../enums/appMode.enum";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {setAppMode} from "../../../store/slices/appConfig/reducers";
import {deletePipeline} from "../../../store/slices/pipeline/reducers";
import {OperationEditDialog} from "./dialogs/operationEditDialog";
import {FetchingStatus} from "../../../models/FetchingStatus";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {Col, Container, Row} from "react-bootstrap";
import {Skeleton} from "@mui/material";
import "./style.css"
import {selectOperations, selectOperationsStatus} from "../../../store/slices/operations/selectors";
import {Operation} from "../../../models/Operation";

const OperationListSkeleton = () => {
    return (
        <Container style={{marginTop: "5px"}}>
            <Row>
                <Col xs={2}>
                    <Skeleton variant="circular" width={40} height={40}/>
                </Col>
                <Col xs={8}>
                    <Skeleton variant="rectangular" height={40}/>
                </Col>
                <Col xs={2}>
                    <Skeleton variant="rectangular" height={40}/>
                </Col>
            </Row>
        </Container>
    )
}

export const OperationsList = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const operations: Operation[] = useSelector(selectOperations);
    const operationsStatus: FetchingStatus = useSelector(selectOperationsStatus);
    const [openOperationEditDialog, setOpenOperationEditDialog] = React.useState<boolean>(false);
    const [operationId, setOperationId] = React.useState<string>("");
    const [operationName, setOperationName] = React.useState<string>("");

    const handleOperationEditOpen = (event: React.MouseEvent<SVGSVGElement>, operationId: string) => {
        event.stopPropagation();
        setOperationId(operationId);
        setOpenOperationEditDialog(true);
    }

    const handleOperationDeletion = (event: React.MouseEvent<SVGSVGElement>, operationId: string) => {
        event.stopPropagation();
        dispatch(deletePipeline(operationId));
        dispatch(setAppMode(APP_MODE.DEFAULT));
    };

    const renderPageContent = () => {
        if (operationsStatus === FETCHING_STATE.LOADING) {
            const skeletonPreview = Array.from({length: 10}, (_, index) => index);

            return (
                skeletonPreview.map((skeleton) => {
                    return (
                        OperationListSkeleton()
                    )
                })
            )
        } else {
            return (
                <React.Fragment>
                    <List dense sx={{width: '100%', bgcolor: 'background.paper', borderRadius: "0px"}}>
                        {operations.map((operation, index) => {
                            return (
                                <ListItem
                                    onClick={() => console.log("clicked")}
                                    key={operation.id + "_" + index}
                                    secondaryAction={
                                        appMode !== APP_MODE.OPERATIONS_DELETION
                                            ?
                                            <EditIcon
                                                onClick={(event) => handleOperationEditOpen(event, operation.id)}/>
                                            : <DeleteIcon
                                                id="operation-deletion-icon"
                                                className="wiggle"
                                                onClick={(event) => handleOperationDeletion(event, operation.id)}
                                                color="warning"/>
                                    }
                                    disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar src={operation.icon}/>
                                        </ListItemAvatar>
                                        <ListItemText id={operation.id} primary={`${operation.name}`}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <OperationEditDialog
                        open={openOperationEditDialog}
                        setOpen={setOpenOperationEditDialog}
                        operationId={operationId}
                    />
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            {
                renderPageContent()
            }
        </React.Fragment>
    );
}
