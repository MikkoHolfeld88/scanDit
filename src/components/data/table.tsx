import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {File} from "../../firebase/types/collections.files";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'filename', headerName: 'Filename'},
    {field: 'url', headerName: 'URL'},
    {field: 'uploaded', headerName: 'Uploaded'}
];

export interface TableProps {
    rows: File[] | undefined;
}

export default function Table(props: TableProps) {

    useEffect(() => {
        console.log(props.rows);
    }, [props.rows]);

    return (
        <DataGrid
            rows={props.rows || []}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 5},
                },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
        />
    );
}
