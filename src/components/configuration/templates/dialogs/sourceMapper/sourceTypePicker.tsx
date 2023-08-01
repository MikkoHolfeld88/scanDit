import {useAppDispatch} from "../../../../../store/store";
import {useSelector} from "react-redux";
import {selectSourceTypePicker} from "../../../../../store/slices/appConfig/selectors";
import * as React from "react";
import {setSourceTypePicker} from "../../../../../store/slices/appConfig/reducers";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {SourceTypePickerSetting} from "../../../../../models/SourceTypePickerSetting";
import {SOURCE_TYPE_PICKER_TYPES} from "../../../../../enums/sourceTypePickerTypes.enum";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ApiIcon from "../../../../../assets/icons/api.png"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StreamIcon from '@mui/icons-material/Stream';
import PublicIcon from '@mui/icons-material/Public';
import StorageIcon from '@mui/icons-material/Storage';

export const SourceTypePicker = () => {
    const dispatch = useAppDispatch();
    const sourcePickerType = useSelector(selectSourceTypePicker);

    const handleSourceTypePicker = (event: React.MouseEvent<HTMLElement>, newSourcePickerType: SourceTypePickerSetting) => {
        if (newSourcePickerType === null) return;
        dispatch(setSourceTypePicker(newSourcePickerType));
    };

    return (
        <ToggleButtonGroup value={sourcePickerType} exclusive onChange={handleSourceTypePicker} size="large">
            <ToggleButton value={SOURCE_TYPE_PICKER_TYPES.FILE}>
                <InsertDriveFileIcon/>
            </ToggleButton>
            <ToggleButton value={SOURCE_TYPE_PICKER_TYPES.DATABASE}>
                <StorageIcon/>
            </ToggleButton>
            <ToggleButton value={SOURCE_TYPE_PICKER_TYPES.API}>
                <img src={ApiIcon} alt="api" style={{width: '28px', height: '28px'}}/>
            </ToggleButton>
            <ToggleButton value={SOURCE_TYPE_PICKER_TYPES.STREAM}>
                <PlayCircleIcon/>
            </ToggleButton>
            <ToggleButton value={SOURCE_TYPE_PICKER_TYPES.WEB}>
                <PublicIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
