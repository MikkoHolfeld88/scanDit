import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import {File} from "../../models/File";
import Avatar from "@mui/material/Avatar";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export interface ToolbarDeleteButtonProps {
    rows: File[] | undefined;
    selectedRows: string[];
    setSelectedRows: (selectedRows: string[]) => void;
    openDeletionDialog: boolean;
    setOpenDeletionDialog: (openDeletionDialog: boolean) => void;
}

export const ToolbarDeleteButton = (props: ToolbarDeleteButtonProps) => {
    return (
        <React.Fragment>
            <Dialog onClose={() => props.setOpenDeletionDialog(false)} open={props.openDeletionDialog}>
                <DialogTitle>Delete files?</DialogTitle>
                <DialogContent>
                    <List>
                        {
                            props.selectedRows.map((rowId: string) => {
                                const filename = props?.rows?.find((file: File) => file.id === rowId)?.filename;
                                return (

                                    <ListItem key={rowId}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <InsertDriveFileIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={filename}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setOpenDeletionDialog(false)}>Delete</Button>
                    <Button onClick={() => props.setOpenDeletionDialog(false)} autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Button startIcon={<DeleteIcon fontSize="small"/>} onClick={() => props.setOpenDeletionDialog(true)}>Delete</Button>
        </React.Fragment>
    )
}
