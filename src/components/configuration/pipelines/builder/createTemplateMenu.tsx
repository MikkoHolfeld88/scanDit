import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from "@mui/icons-material/Add";
import {Template} from "../../../../models/Template";
import {AppDispatch, RootState, useAppDispatch} from "../../../../store/store";
import {setAppMode, setConfigurationTab} from "../../../../store/slices/appConfig/reducers";
import {TemplateCreationDialog} from "../../templates/dialogs/templateCreationDialog";
import {APP_MODE} from "../../../../enums/appMode.enum";
import {v4} from "uuid";
import {TEMPLATE_TYPE} from "../../../../enums/templateType.enum";
import {addTemplate} from "../../../../store/slices/template/reducers";
import {Pipeline} from "../../../../models/Pipeline";
import {useSelector} from "react-redux";
import {selectPipelineById} from "../../../../store/slices/pipeline/selectors";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

interface CreateTemplateMenuProps {
    setOpenPipelineBuilder: (open: boolean) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    openMenu: boolean;
    handleClose: () => void;
    pipelineId: string;
}

export const CreateTemplateMenu = (props: CreateTemplateMenuProps) => {
    const pipeline: Pipeline | undefined = useSelector((state: RootState) => selectPipelineById(state, props.pipelineId));

    const [openTemplateCreation, setOpenTemplateCreation] = React.useState(false);
    const dispatch: AppDispatch = useAppDispatch();

    const handleCreateTemplate = () => {
        const newId = v4().toString();

        const newTemplate: Template = {
            id: newId,
            name: "New template for: '" + pipeline?.name + "'" || newId,
            description: '',
            editable: true,
            created: new Date().toISOString(),
            author: '',
            type: TEMPLATE_TYPE.PROCESS,
            operations: []
        }

        dispatch(addTemplate(newTemplate));
        props.handleClose();
        props.setAnchorEl(null);
        props.setOpenPipelineBuilder(false);
        dispatch(setAppMode(APP_MODE.TEMPLATE_CREATION_BY_PIPELINE_BUILDER));
        dispatch(setConfigurationTab(1));
    }

    const handleChooseTemplate = () => {
        props.handleClose();
        props.setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <StyledMenu
                id="creaet-pick-template-menu"
                anchorEl={props.anchorEl}
                open={props.openMenu}
                onClose={props.handleClose}>
                <MenuItem onClick={handleCreateTemplate} disableRipple>
                    <AddIcon/>
                    Create Template
                </MenuItem>

                <MenuItem onClick={handleChooseTemplate} disableRipple>
                    <FileCopyIcon/>
                    Pick Template
                </MenuItem>

            </StyledMenu>
            <TemplateCreationDialog open={openTemplateCreation} setOpen={setOpenTemplateCreation}/>
        </React.Fragment>
    );
}
