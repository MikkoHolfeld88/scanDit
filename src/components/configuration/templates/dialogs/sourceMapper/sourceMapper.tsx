import {Template} from "../../../../../models/Template";
import Dialog from "@mui/material/Dialog";
import {DialogTransition} from "../../../../layout/transitions/dialogTransition";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Container, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Sequencer} from "../operationSequenceCreator/sequencer";
import {OperationEditDialog} from "../../../operations/dialogs/operationEditDialog";
import * as React from "react";
import {SourceTypePicker} from "./sourceTypePicker";
import {SourceTypePickerSetting} from "../../../../../models/SourceTypePickerSetting";
import {useSelector} from "react-redux";
import {selectSourceTypePicker} from "../../../../../store/slices/appConfig/selectors";
import {SOURCE_TYPE_PICKER_TYPES} from "../../../../../enums/sourceTypePickerTypes.enum";
import {convertSelectedFilesToSources, FilePicker} from "./pickers/filePicker";
import {AppDispatch, useAppDispatch} from "../../../../../store/store";
import {editTemplate} from "../../../../../store/slices/template/reducers";
import {useEffect} from "react";
import {File} from "../../../../../models/File";
import {selectFilesAsArray} from "../../../../../store/slices/data/selectors";

interface SourceMapperProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    template: Template | undefined;
}

export const SourceMapper = (props: SourceMapperProps) => {
    const dispatch: AppDispatch = useAppDispatch();
    const files: File[] | null = useSelector(selectFilesAsArray);
    const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
    const sourcePickerType: SourceTypePickerSetting = useSelector(selectSourceTypePicker);

    const handleSave = () => {
        dispatch(editTemplate({
            id: props.template?.id,
            sources: convertSelectedFilesToSources(files, selectedFiles)
        } as Template));
    };

    const handleClose = () => {
        if (props?.template) {
            dispatch(editTemplate(props.template));
        }

        props.setOpen(false);
    };

    const renderTypeBasedSources = () => {
        switch(sourcePickerType) {
            case SOURCE_TYPE_PICKER_TYPES.FILE:
                return <FilePicker
                    templateId={props?.template?.id}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}/>;
            case SOURCE_TYPE_PICKER_TYPES.API:
                return <div>API</div>;
            case SOURCE_TYPE_PICKER_TYPES.DATABASE:
                return <div>Database</div>;
            case SOURCE_TYPE_PICKER_TYPES.STREAM:
                return <div>Stream</div>;
            case SOURCE_TYPE_PICKER_TYPES.WEB:
                return <div>Web</div>;
            default:
                return <FilePicker
                    templateId={props?.template?.id}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}/>;
        }
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
                                {`Source picker`}
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

            <Container>
                <Row className="justify-content-center mt-2">
                    <SourceTypePicker />
                </Row>
                    {
                        renderTypeBasedSources()
                    }
            </Container>

        </Dialog>
    )

}
