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
import {truncateFilename} from "../../style/displayFunctions/truncateFilename";
import DeleteIcon from "@mui/icons-material/Delete";
import {Image} from "primereact/image";

export const List = () => {
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const files: File[] | null = useSelector(selectFilesAsArray);

    const onFileClick = (file: FileObject) => {
        setSelectedFile(file);
        setImageDialogOpen(true)
    }

    const renderAvatar = (file: FileObject) => {
        switch (file.filetype) {
            case 'images':
                return <Avatar><Image src={file.url} preview/></Avatar>;
            default:
                return <QuestionMarkIcon style={{width: "40px", height: "40px"}}/>;
        }
    }

    const deleteFile = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
        console.log("Delete file");
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
                                    <IconButton onClick={(e) => deleteFile(e)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                                disablePadding>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        {
                                            renderAvatar(file)
                                        }
                                    </ListItemAvatar>
                                    <ListItemText id={file.id} primary={truncateFilename(file.filename)}
                                                  onClick={() => onFileClick(file)}/>
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                }

            </MUIList>
            <ListDialog file={selectedFile} open={imageDialogOpen} setOpen={setImageDialogOpen}/>
        </React.Fragment>
    );
}
