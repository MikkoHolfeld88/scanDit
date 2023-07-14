import {selectFilesAsArray} from "../../store/slices/data/selectors";
import {useSelector} from "react-redux";
import {File} from "../../models/File";
import React from "react";
import {List as MUIList} from '@mui/material';
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

export const List = () => {
    const fileReader = new FileReader();
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('');
    const [imageName, setImageName] = React.useState('');
    const files: File[] | null = useSelector(selectFilesAsArray);

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

    return (
        <React.Fragment>
            <MUIList dense>
                {
                    files?.map((file: File) => {
                        return (
                            <ListItem
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
