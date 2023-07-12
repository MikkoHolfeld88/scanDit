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

export const List = () => {
    const files: File[] | null = useSelector(selectFilesAsArray);

    return (
        <MUIList dense>
            {
                files?.map((file: File) => {
                    return (
                        <ListItem
                            key={file.id}
                            disablePadding>
                            <ListItemButton>
                                <ListItemAvatar>
                                    {file.filetype === 'images'
                                        ? <Avatar src={file.url}/>
                                        : <QuestionMarkIcon style={{width: "40px", height: "40px"}}/>
                                    }
                                </ListItemAvatar>
                                <ListItemText id={file.id} primary={file.filename}/>
                            </ListItemButton>
                        </ListItem>
                    );
                })
            }
        </MUIList>

    );
}
