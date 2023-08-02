import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from "@mui/material/Typography";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch} from "../../../../store/store";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {TemplateDeletionDialog} from "./templateDeletionDialog";
import {selectTemplateById} from "../../../../store/slices/template/selectors";
import {Template} from "../../../../models/Template";
import {deleteTemplate, editTemplate} from "../../../../store/slices/template/reducers";
import {TemplateEditAccordion} from "./templateEditAccordion";
import {Operation} from "../../../../models/Operation";
import {TemplateType} from "../../../../models/TemplateType";
import {getAuth} from "firebase/auth";
import {Source} from "../../../../models/Source";
import {Target} from "../../../../models/Target";
import {TEMPLATE_TYPE} from "../../../../enums/templateType.enum";
import "./style.css"
import {Container, Row} from "react-bootstrap";
import {OperationSequenceCreator} from "./operationSequenceCreator/operationSequenceCreator";
import {SourceMapper} from "./sourceMapper/sourceMapper";
import {TargetMapper} from "./targetMapper/targetMapper";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface TemplateEditionDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    templateId: string;
}

export const TemplateEditDialog = (props: TemplateEditionDialogProps) => {
    const dispatch = useAppDispatch();
    const template: Template | undefined = useSelector(selectTemplateById(props.templateId));
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [author, setAuthor] = React.useState<string>("");
    const [type, setType] = React.useState<TemplateType>(null);
    const [sources, setSources] = React.useState<Source[]>([]);
    const [targets, setTargets] = React.useState<Target[]>([]);
    const [showTemplateDetails, setShowTemplateDetails] = React.useState<boolean>(true);
    const [openTemplateDeletionDialog, setOpenTemplateDeletionDialog] = React.useState<boolean>(false);
    const [openOperationSequenceCreator, setOpenOperationSequenceCreator] = React.useState<boolean>(false);
    const [openSourceMapper, setOpenSourceMapper] = React.useState<boolean>(false);
    const [openTargetMapper, setOpenTargetMapper] = React.useState<boolean>(false);

    useEffect(() => {
        if (template) {
            setName(template.name);
            setDescription(template.description || description);
            setAuthor(template.author || getAuth().currentUser?.displayName || author);
            setType(template.type);
            setTargets(template.targets || []);
            setSources(template.sources || []);
        }
    }, [template]);

    const handleDeletion = () => {
        if (template && template.id) {
            dispatch(deleteTemplate(template?.id));
            setOpenTemplateDeletionDialog(false);
            handleClose();
        }
    }

    const clearLocalStates = () => {
        setName("");
        setDescription("");
        setAuthor("");
        setType(null);
        setSources([]);
        setTargets([]);
    }

    const handleClose = () => {
        clearLocalStates();
        props.setOpen(false);
    };

    const handleUpdate = () => {
        if (name === "" || type === null) {
            return;
        }

        if (!template?.id) {
            return;
        }

        const editedTemplate: Template = {
            id: template?.id,
            name: name,
            created: template.created,
            description: description,
            type: type,
            editable: template.editable,
        }

        dispatch(editTemplate(editedTemplate));
        handleClose();
    }

    const handleCancel = () => {
        props.setOpen(false);
        setName(template?.name || "");
        setDescription(template?.description || "");
        setAuthor(template?.author || "");
        setType(template?.type || null);
    }

    const renderTypeSpecificFields = () => {
        const handleSourcesClick = () => {
            setOpenSourceMapper(true);
            props.setOpen(false);
        }

        const handleTargetsClick = () => {
            setOpenTargetMapper(true);
            props.setOpen(false);
        }

        const handleOperationsClick = () => {
            setOpenOperationSequenceCreator(true);
            props.setOpen(false);
        }

        if (template) {
            switch (template.type) {
                case TEMPLATE_TYPE.INPUT:
                    return (
                        <Button
                            onClick={handleSourcesClick}
                            fullWidth
                            variant="contained"
                            className="specific-type-fields-button">
                            Sources
                        </Button>
                    )
                case TEMPLATE_TYPE.OUTPUT:
                    return (
                        <Button
                            onClick={handleTargetsClick}
                            fullWidth
                            variant="contained"
                            className="specific-type-fields-button">
                            Targets
                        </Button>
                    )
                case TEMPLATE_TYPE.PROCESS:
                    return (
                        <Button
                            onClick={handleOperationsClick}
                            fullWidth
                            variant="contained"
                            className="specific-type-fields-button">
                            Operations
                        </Button>
                    )
                default:
                    break;
            }
        }
    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Container>
                        <Row>
                            <Typography variant="h6">Edit template</Typography>
                        </Row>
                        <Row>
                            <Typography variant="subtitle2">{template?.name}</Typography>
                        </Row>
                    </Container>
                    <IconButton edge="end" color="inherit" onClick={handleCancel}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {
                    renderTypeSpecificFields()
                }

                <TemplateEditAccordion
                    expanded={showTemplateDetails}
                    setExpanded={setShowTemplateDetails}
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    author={author}
                    setAuthor={setAuthor}
                    type={type}
                    setType={setType}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} startIcon={<CancelIcon/>}
                        variant="outlined">Cancel</Button>
                <Button onClick={handleUpdate} startIcon={<EditIcon/>} variant="outlined">Update</Button>
                <IconButton onClick={() => setOpenTemplateDeletionDialog(true)} sx={{minHeight: "36.5px"}}>
                    <DeleteIcon color="warning"/>
                </IconButton>
            </DialogActions>
            <TemplateDeletionDialog
                handleDeletion={handleDeletion}
                templateId={props.templateId}
                templateName={template?.name || ""}
                open={openTemplateDeletionDialog}
                setOpen={setOpenTemplateDeletionDialog}/>
            <OperationSequenceCreator
                open={openOperationSequenceCreator}
                setOpen={setOpenOperationSequenceCreator}
                template={template}/>
            <SourceMapper open={openSourceMapper} setOpen={setOpenSourceMapper} template={template} />
            <TargetMapper open={openTargetMapper} setOpen={setOpenTargetMapper} template={template} />
        </Dialog>
    );
}
