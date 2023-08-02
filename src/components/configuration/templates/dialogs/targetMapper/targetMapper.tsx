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
import * as React from "react";
import {useSelector} from "react-redux";
import {selectTargetTypePicker} from "../../../../../store/slices/appConfig/selectors";
import {AppDispatch, useAppDispatch} from "../../../../../store/store";
import {editTemplate} from "../../../../../store/slices/template/reducers";
import {TargetType} from "../../../../../models/TargetType";
import {TARGET_TYPE} from "../../../../../enums/targetType.enum";
import {TargetTypePicker} from "./targetTypePicker";
import {DownloadPicker} from "./pickers/downloadPicker";

interface TargetMapperProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    template: Template | undefined;
}

export const TargetMapper = (props: TargetMapperProps) => {
    const dispatch: AppDispatch = useAppDispatch();
    const targetPickerType: TargetType = useSelector(selectTargetTypePicker);

    const handleSave = () => {
        props.setOpen(false);
    };

    const handleClose = () => {
        if (props?.template) {
            dispatch(editTemplate(props.template));
        }

        props.setOpen(false);
    };

    const renderTypeBasedSources = () => {
        switch (targetPickerType) {
            case TARGET_TYPE.DOWNLOAD:
                return <DownloadPicker />
            case TARGET_TYPE.DISPLAY:
                return <div>Display</div>;
            case TARGET_TYPE.TRANSFER:
                return <div>Transfer</div>;
            case TARGET_TYPE.STREAM:
                return <div>Stream</div>;
            default:
                return <h1>Download</h1>;
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
                                {`Target picker`}
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
                    <TargetTypePicker/>
                </Row>
                {
                    renderTypeBasedSources()
                }
            </Container>

        </Dialog>
    )

}
