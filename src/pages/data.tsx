import React, {useEffect} from "react";
import {Upload} from "../components/data/upload";
import ListViewStyle from "../components/data/listViewStyle";
import {File} from "../models/File";
import {getUserFiles} from "../firebase/realtimeDatabase";
import {useSelector} from "react-redux";
import {LIST_VIEW_STYLES} from "../enums/listViewStyles.enum";
import {useAppDispatch} from "../store/store";
import {setFiles} from "../store/slices/data/reducers";
import {List} from "../components/data/list";
import {selectListViewStyle} from "../store/slices/appConfig/selectors";

export const Data = () => {
    const dispatch = useAppDispatch();
    const viewStyle = useSelector(selectListViewStyle);

    useEffect(() => {
        const unsubscribe = getUserFiles((data: File[] | null) => {
            console.log(data);
            dispatch(setFiles(data));
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
            </div>
            {
                viewStyle === LIST_VIEW_STYLES.LIST &&
                <div id="data-page-list" className="data-list">
                    <List/>
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
