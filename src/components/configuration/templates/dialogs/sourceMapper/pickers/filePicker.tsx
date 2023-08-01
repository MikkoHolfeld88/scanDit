import React from 'react';
import {Checkbox} from '@mui/material';
import {useSelector} from 'react-redux';
import {File} from '../../../../../../models/File';
import {selectFilesAsArray} from "../../../../../../store/slices/data/selectors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Source} from "../../../../../../models/Source";
import {SOURCE_TYPE_PICKER_TYPES} from "../../../../../../enums/sourceTypePickerTypes.enum";
import {renderFileListAvatar} from "../../../../../data/fileList";

export const convertSelectedFilesToSources = (files: File[], selectedFiles: string[]) => {
    if (!files || files.length === 0 || !selectedFiles || selectedFiles.length === 0) {
        return [];
    }

    const filteredFiles: File[] = files.filter((file: File) => selectedFiles.includes(file.id ? file.id : ''));
    return filteredFiles.map((file: File) => {
        return {
            type: SOURCE_TYPE_PICKER_TYPES.FILE,
            filetype: file.filetype,
            dataUrl: file.url
        } as Source;
    });
}

interface FilePickerProps {
    selectedFiles: string[];
    setSelectedFiles: (selectedFiles: string[]) => void;
    templateId: string | undefined;
}

export const FilePicker = (props: FilePickerProps) => {
    const files: File[] | null = useSelector(selectFilesAsArray);

    const handleCheckboxChange = (file: File) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!file.id) {
            console.error("File has no id. Aborted checkbox change on FilePicker.");
            return;
        }

        if (event.target.checked) {
            if (props.selectedFiles.includes(file.id)) {
                return;
            } else {
                props.setSelectedFiles([...props.selectedFiles, file.id]);
            }
        } else {
            if (props.selectedFiles.includes(file.id)) {
                props.setSelectedFiles(props.selectedFiles.filter((id) => id !== file.id));
            } else {
                return;
            }
        }
    };

    return (
        <List dense>
            {
                files?.map((file: File, index) => {
                    return (
                        <ListItem
                            key={file.id}
                            disablePadding>
                            <ListItemButton>
                                <ListItemAvatar>
                                    {
                                        renderFileListAvatar(file, false)
                                    }
                                </ListItemAvatar>
                                <ListItemText
                                    id={file.id}
                                    primary={file?.filenameToDisplay ? file?.filenameToDisplay : ''}/>
                                <Checkbox
                                    edge="end"
                                    onChange={handleCheckboxChange(file)}
                                    checked={file.id ? props.selectedFiles.includes(file.id) : false}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })
            }
        </List>
    );
}
