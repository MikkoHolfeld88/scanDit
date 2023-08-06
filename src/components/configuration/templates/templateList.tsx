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
import {FetchingStatus} from "../../../models/FetchingStatus";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {Col, Container, Row} from "react-bootstrap";
import {Skeleton} from "@mui/material";
import "./style.css"
import {TemplateEditDialog} from "./dialogs/templateEditDialog";
import {
    selectLatestCreatedTemplate,
    selectTemplates,
    selectTemplateStatus
} from "../../../store/slices/template/selectors";
import {Template} from "../../../models/Template";
import {deleteTemplate} from "../../../store/slices/template/reducers";
import StartIcon from '@mui/icons-material/Start';
import OutputIcon from '@mui/icons-material/Output';
import {TEMPLATE_TYPE} from "../../../enums/templateType.enum";
import MemoryIcon from '@mui/icons-material/Memory';
import ExtensionIcon from "@mui/icons-material/Extension";
import {sortByType} from "../../../services/templateSortingService";

const TemplateSkeleton = (id: number) => {
    return (
        <Container style={{marginTop: "5px"}} key={id}>
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

export const TemplateList = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const appMode: AppMode = useSelector(selectAppMode);
    const latestCreatedTemplate: Template = useSelector(selectLatestCreatedTemplate);
    const templates: Template[] = useSelector(selectTemplates);
    const templatesStatus: FetchingStatus = useSelector(selectTemplateStatus);
    const [openTemplateEditDialog, setOpenTemplateEditDialog] = React.useState<boolean>(false);
    const [templateId, setTemplateId] = React.useState<string>("");

    useEffect(() => {
        if (appMode === APP_MODE.TEMPLATE_CREATION_BY_PIPELINE_BUILDER) {
            setTemplateId(latestCreatedTemplate.id);
            setOpenTemplateEditDialog(true);
        }
    }, [latestCreatedTemplate]);

    const handleTemplateEditOpen = (event: React.MouseEvent<SVGSVGElement>, templateId: string) => {
        event.stopPropagation();
        setTemplateId(templateId);
        setOpenTemplateEditDialog(true);
    }

    const handleTemplateDeletion = (event: React.MouseEvent<SVGSVGElement>, templateId: string) => {
        event.stopPropagation();
        dispatch(deleteTemplate(templateId));
    };

    // only temporary funciton untel icons are freely choosable
    const renderTempalteIcon = (templateType: TEMPLATE_TYPE | null) => {
        switch (templateType) {
            case TEMPLATE_TYPE.INPUT:
                return <StartIcon/>;
            case TEMPLATE_TYPE.PROCESS:
                return <MemoryIcon/>;
            case TEMPLATE_TYPE.OUTPUT:
                return <OutputIcon/>;
            default:
                return <ExtensionIcon/>;
        }
    }

    const renderPageContent = () => {
        if (templatesStatus === FETCHING_STATE.LOADING) {
            const skeletonPreview = Array.from({length: 10}, (_, index) => index);

            return (
                skeletonPreview.map((skeleton, index) => {
                    return (
                        TemplateSkeleton(index)
                    )
                })
            )
        } else {
            return (
                <React.Fragment>
                    <List dense sx={{width: '100%', bgcolor: 'background.paper', borderRadius: "0px"}}>
                        {[...templates].sort(sortByType).map((template, index) => {
                            return (
                                <ListItem
                                    onClick={() => console.log("clicked")}
                                    key={template.id + "_" + index}
                                    secondaryAction={
                                        appMode !== APP_MODE.TEMPLATE_DELETION
                                            ? <EditIcon onClick={(event) => handleTemplateEditOpen(event, template.id)}/>
                                            : <DeleteIcon
                                                id="template-deletion-icon"
                                                className="wiggle"
                                                onClick={(event) => handleTemplateDeletion(event, template.id)}
                                                color="warning"/>
                                    }
                                    disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {
                                                    renderTempalteIcon(template.type)
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText id={template.id} primary={`${template.name}`}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <TemplateEditDialog
                        open={openTemplateEditDialog}
                        setOpen={setOpenTemplateEditDialog}
                        templateId={templateId}
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
