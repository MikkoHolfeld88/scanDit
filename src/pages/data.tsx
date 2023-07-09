import React, {useEffect} from "react";
import {Upload} from "../components/data/upload";
import ListViewStyle from "../components/data/listViewStyle";
import {FilesCollection} from "../models/collections/files.collection"
import {File} from "../models/File";
import {RealtimeDatabasePaths} from "../models/RealtimeDatabasePaths";
import Table from "../components/data/table";
import {getUserFiles} from "../firebase/realtimeDatabase";
import {useSelector} from "react-redux";
import {LIST_VIEW_STYLES} from "../enums/listViewStyles.enum";

export const Data = () => {
    const viewStyle = useSelector((state: any) => state.appConfig.listViewStyle);

    const emptyRow = {id: '', filename: '', filetype: '', uploaded: '', url: ''};
    const [data, setData] = React.useState<FilesCollection | null>(null);
    const [rows, setRows] = React.useState<File[]>([emptyRow]);

    useEffect(() => {
        const unsubscribe = getUserFiles(setData);

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        setRows(createRowsFromData());
    }, [data]);

    const parseDate = (date: string) => {
        return `${new Date(date).toLocaleDateString()}, ${new Date(date).toLocaleTimeString()}`
    }


    /**
     * Maps the data from the database to the rows fitting to the
     * table exepcted format.
     */
    const createRowsFromData = () => {
        if (!data) return [emptyRow];

        const rows = Object.keys(data).flatMap((key, index) => {
            return data[key as keyof RealtimeDatabasePaths]?.map((file: File, index2) => {
                return {
                    index: index + index2 + 1,
                    id: file.id,
                    filename: file.filename,
                    filetype: key,
                    uploaded: parseDate(file.uploaded),
                    url: file.url
                };
            }) || [emptyRow];
        });

        return rows;
    }


    return (
        <React.Fragment>
            <div id="data-page-header" className="d-flex">
                <Upload/>
                <ListViewStyle/>
            </div>

            {
                viewStyle === LIST_VIEW_STYLES.TABLE &&
                <div id="data-page-table" className="data-table">
                    <Table rows={rows}/>
                </div>
            }
        </React.Fragment>
    );
}
