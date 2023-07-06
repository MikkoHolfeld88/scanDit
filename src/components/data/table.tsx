import * as React from 'react';
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import {File} from "../../firebase/types/collections.files";
import Button from "@mui/material/Button";

export interface TableProps {
    rows: File[] | undefined;
}

export default function Table(props: TableProps) {
    const renderFilename = (params: GridCellParams) => {
        const formattedValue: string | undefined = params.formattedValue as string;
        const field: string | undefined = params.field as string;

        if (field?.toLowerCase() === 'filename' && formattedValue) {
            const file = props.rows?.find((file: File) => file.filename === formattedValue);

            if (file && file.url) {
                return (
                    <Button
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                        }}>
                        {formattedValue}
                    </Button>
                );
            }
        }

        return '';
    }

    const basicColumns: GridColDef[] = [
        {field: 'index', headerName: 'Index', flex: 1},
        {field: 'filename', headerName: 'Filename', flex: 8, renderCell: renderFilename},
        {field: 'filetype', headerName: 'Filetype', flex: 4},
        {field: 'uploaded', headerName: 'Uploaded', flex: 4},
        {field: 'id', headerName: 'ID', flex: 8}
    ];

    return (
        <DataGrid
            slots={{toolbar: GridToolbar}}
            rows={props.rows || []}
            columns={basicColumns}
            initialState={{
                pagination: {
                    paginationModel: {
                        page: 0,
                        pageSize: 5
                    },
                },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
        />
    );
}
