import {AppDispatch, useAppDispatch} from "../../../../../store/store";
import {useSelector} from "react-redux";
import {selectTargetTypePicker} from "../../../../../store/slices/appConfig/selectors";
import * as React from "react";
import {setTargetTypePicker} from "../../../../../store/slices/appConfig/reducers";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DownloadIcon from '@mui/icons-material/Download';
import {TargetType} from "../../../../../models/TargetType";
import {TARGET_TYPE} from "../../../../../enums/targetType.enum";
import SendIcon from '@mui/icons-material/Send';
import PreviewIcon from '@mui/icons-material/Preview';
import MessageIcon from '@mui/icons-material/Message';

export const TargetTypePicker = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const targetPickerType: TargetType = useSelector(selectTargetTypePicker);

    const handleSourceTypePicker = (event: React.MouseEvent<HTMLElement>, newTargetPickerType: TargetType) => {
        if (newTargetPickerType === null) return;
        dispatch(setTargetTypePicker(newTargetPickerType));
    };

    return (
        <ToggleButtonGroup value={targetPickerType} exclusive onChange={handleSourceTypePicker} size="large">
            <ToggleButton value={TARGET_TYPE.DOWNLOAD}>
                <DownloadIcon/>
            </ToggleButton>
            <ToggleButton value={TARGET_TYPE.DISPLAY}>
                <PreviewIcon/>
            </ToggleButton>
            <ToggleButton value={TARGET_TYPE.TRANSFER}>
                <SendIcon/>
            </ToggleButton>
            <ToggleButton value={TARGET_TYPE.MESSAGING}>
                <MessageIcon/>
            </ToggleButton>
            <ToggleButton value={TARGET_TYPE.STREAM}>
                <PlayCircleIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
