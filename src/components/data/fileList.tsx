import {selectFilesAsArray} from "../../store/slices/data/selectors";
import {useSelector} from "react-redux";
import {File, File as FileObject} from "../../models/File";
import React from "react";
import {Divider, IconButton, List as MUIList} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {ListDialog} from "./listDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import {Image} from "primereact/image";
import {DeletionDialog} from "./deletionDialog";

export const renderFileListAvatar = (file: FileObject, preview: boolean = true) => {
    switch (file.filetype) {
        case 'images':
            return <Avatar><Image src={file.url} preview={preview}/></Avatar>;
        default:
            return <QuestionMarkIcon style={{width: "40px", height: "40px"}}/>;
    }
}

export const FileList = () => {
    const [listDialogOpen, setListDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const files: File[] | null = useSelector(selectFilesAsArray);

    const onFileClick = (file: FileObject) => {
        setSelectedFile(file);
        setListDialogOpen(true)
    }

    const deleteFile = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>, file: FileObject) => {
        setSelectedFile(file);
        setDeleteDialogOpen(true);
    }

    return (
        <React.Fragment>
            <MUIList dense>
                <Divider/>
                {
                    files?.map((file: File, index) => {
                        return (
                            <ListItem
                                key={file.id}
                                secondaryAction={
                                    <IconButton onClick={(e) => deleteFile(e, file)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                                disablePadding>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        {
                                            renderFileListAvatar(file)
                                        }
                                    </ListItemAvatar>
                                    <ListItemText
                                        id={file.id}
                                        primary={file?.filenameToDisplay ? file?.filenameToDisplay : ''}
                                        onClick={() => onFileClick(file)}/>
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                }

            </MUIList>
            <ListDialog file={selectedFile} open={listDialogOpen} setOpen={setListDialogOpen}/>
            <DeletionDialog file={selectedFile} open={deleteDialogOpen} setOpen={setDeleteDialogOpen}/>
        </React.Fragment>
    );
}
