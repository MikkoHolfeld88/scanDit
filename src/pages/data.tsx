import React, {useEffect} from "react";
import {Upload} from "../components/data/upload";
import ListViewStyle from "../components/data/listViewStyle";
import {File} from "../models/File";
import {getUserFiles} from "../firebase/realtimeDatabase";
import {useSelector} from "react-redux";
import {LIST_VIEW_STYLES} from "../enums/listViewStyles.enum";
import {RootState, useAppDispatch} from "../store/store";
import {setData} from "../store/slices/data/reducers";
import {List} from "../components/data/list";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {selectListViewStyle} from "../store/slices/appConfig/selectors";
import {selectSelectedFiles} from "../store/slices/data/selectors";

export const Data = () => {
    const dispatch = useAppDispatch();
    const selectedFiles = useSelector(selectSelectedFiles);
    const viewStyle = useSelector(selectListViewStyle);

    useEffect(() => {
        const unsubscribe = getUserFiles((data: File[] | null) => {
            dispatch(setData(data));
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="data-content">
            <div id="data-page-header" className="d-flex">
                <Upload/>
                <ListViewStyle/>
                <IconButton color="error" edge="end" disabled={selectedFiles?.length === 0} style={{marginLeft: 'auto'}}>
                    <DeleteIcon fontSize="large" />
                </IconButton>
            </div>
            {
                viewStyle === LIST_VIEW_STYLES.LIST &&
                <div id="data-page-list" className="data-list">
                    <List />
                </div>
            }
            {
                viewStyle === LIST_VIEW_STYLES.TABLE &&
                <div id="data-page-table" className="data-table">

                </div>
            }
            {
                viewStyle === LIST_VIEW_STYLES.FREE &&
                <div id="data-page-free" className="data-free">

                </div>
            }
        </div>
    );
}
