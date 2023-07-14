import {selectFilesAsArray, selectSelectedFiles} from "../../store/slices/data/selectors";
import {useSelector} from "react-redux";
import {File} from "../../models/File";
import React from "react";
import {Divider, List as MUIList, ListItemSecondaryAction} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {File as FileObject} from "../../models/File";
import {ImageDialog} from "./imageDialog";
import {truncateFilename} from "../../style/displayFunctions/truncateFilename";
import {REALTIME_DATABASE_PATHS} from "../../constants/realtimeDatabasePaths";
import Checkbox from "@mui/material/Checkbox";
import {useAppDispatch} from "../../store/store";
import {addSelectedFile, removeSelectedFile, setSelectedFiles} from "../../store/slices/data/reducers";

export const List = () => {
    const dispatch = useAppDispatch();
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('');
    const [imageName, setImageName] = React.useState('');
    const files: File[] | null = useSelector(selectFilesAsArray);
    const selectedFiles: FileObject[] | null = useSelector(selectSelectedFiles);

    const handleToggle = (file: File | undefined) => () => {
        if (file === undefined) {
            return;
        }

        if (selectedFiles?.find((selectedFile) => selectedFile.id === file.id) !== undefined) {
            dispatch(removeSelectedFile(file.id));
        } else {
            dispatch(addSelectedFile(file));
        }
    };

    const onFileClick = (file: FileObject) => {
        switch(file.filetype) {
            case REALTIME_DATABASE_PATHS.IMAGES: openImageDialog(file.filename, file.url); break;
            default: console.log("Unknown filetype");
        }
    }

    const openImageDialog = (imageName: string, imageUrl: string) => {
        setImageName(imageName);
        setImageUrl(imageUrl);
        setImageDialogOpen(true);
    }

    const renderAvatar = (file: FileObject) => {
        switch (file.filetype) {
            case 'images':
                return <Avatar src={file.url}/>;
            default:
                return <QuestionMarkIcon style={{width: "40px", height: "40px"}}/>;
        }
    }

    const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(setSelectedFiles(files as FileObject[]));
        } else {
            dispatch(setSelectedFiles([]));
        }
    };

    return (
        <React.Fragment>
            <MUIList dense>
                <Divider />
                {
                    files?.map((file: File, index) => {
                        return (
                            <ListItem
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(file)}
                                        checked={selectedFiles?.find((selectedFile) => selectedFile.id === file.id) !== undefined}
                                    />
                                }
                                key={file.id}
                                disablePadding>
                                <ListItemButton onClick={() => onFileClick(file)}>
                                    <ListItemAvatar>
                                        {
                                            renderAvatar(file)
                                        }
                                    </ListItemAvatar>
                                    <ListItemText id={file.id} primary={truncateFilename(file.filename)}/>
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                }

            </MUIList>
            <ImageDialog imageUrl={imageUrl} open={imageDialogOpen} setOpen={setImageDialogOpen} imageName={imageName}/>
        </React.Fragment>


    );
}
