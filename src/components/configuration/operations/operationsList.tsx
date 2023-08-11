import React, {useEffect} from "react";
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
import {OperationEditDialog} from "./dialogs/operationEditDialog";
import {FetchingStatus} from "../../../models/FetchingStatus";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {Col, Container, Row} from "react-bootstrap";
import {Skeleton} from "@mui/material";
import "./style.css"
import {
    selectLatestCreatedOperation,
    selectOperations,
    selectOperationsStatus
} from "../../../store/slices/operations/selectors";
import {Operation} from "../../../models/Operation";
import {deleteOperation} from "../../../store/slices/operations/reducers";
import {OPERATION_TYPE} from "../../../enums/operationsTypes/operationType.enum";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import TransformIcon from '@mui/icons-material/Transform';

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
    const latestCreatedOperation: Operation = useSelector(selectLatestCreatedOperation);
    const [openOperationEditDialog, setOpenOperationEditDialog] = React.useState<boolean>(false);
    const [operationId, setOperationId] = React.useState<string>("");

    useEffect(() => {
        // If the user is in the operation creation mode, the operation edit dialog is opened automatically
        if (appMode === APP_MODE.OPERATION_CREATION_FROM_TEMPLATE || appMode == APP_MODE.OPERATION_CREATION_BY_PIPELINE_BUILDER){
            setOperationId(latestCreatedOperation.id);
            setOpenOperationEditDialog(true);
        }
    }, [latestCreatedOperation])

    const handleOperationEditOpen = (event: React.MouseEvent<SVGSVGElement>, operationId: string) => {
        event.stopPropagation();
        setOperationId(operationId);
        setOpenOperationEditDialog(true);
    }

    const handleOperationDeletion = (event: React.MouseEvent<SVGSVGElement>, operationId: string) => {
        event.stopPropagation();
        dispatch(deleteOperation(operationId));
    };

    // only temporary funciton untel icons are freely choosable
    const renderOperationIcon = (templateType: OPERATION_TYPE | null) => {
        switch (templateType) {
            case OPERATION_TYPE.EXTRACTION:
                return <UnarchiveIcon/>;
            case OPERATION_TYPE.GENERATION:
                return <BuildCircleIcon/>;
            case OPERATION_TYPE.TRANSFORMATION:
                return <TransformIcon/>
            default:
                return <PrecisionManufacturingIcon/>;
        }
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
                                            <Avatar>
                                                {
                                                    renderOperationIcon(operation.type)
                                                }
                                            </Avatar>
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
};
