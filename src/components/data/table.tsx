import * as React from 'react';
import {
    DataGrid,
    GridCellParams,
    GridColDef,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import {File} from "../../models/File";
import Button from "@mui/material/Button";
import {styled} from "@mui/material";

import {ToolbarDeleteButton as GridToolbarDeleteButton} from "./toolbarDeleteButton";

const StyledDataGrid = styled(DataGrid)({
    '& .MuiTablePagination-toolbar': {
        alignItems: 'baseline',
    }
});

export interface TableProps {
    rows: File[] | undefined;
}

export default function Table(props: TableProps) {
    const [paginationModel, setPaginationModel] = React.useState({pageSize: 25, page: 0,});
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
    const [openDeletionDialog, setOpenDeletionDialog] = React.useState(false);

    const CustomGridToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport/>
                <GridToolbarDeleteButton
                    selectedRows={selectedRows}
                    rows={props.rows}
                    setOpenDeletionDialog={setOpenDeletionDialog}
                    openDeletionDialog={openDeletionDialog}
                    setSelectedRows={setSelectedRows}
                />
            </GridToolbarContainer>
        )

    }

    const handleSelectionChange = (rowIds: string[] | any) => {
        setSelectedRows(rowIds)
    }

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
        <StyledDataGrid
            // localeText={deDE.components.MuiDataGrid.defaultProps.localeText}
            onRowSelectionModelChange={handleSelectionChange}
            slots={{toolbar: CustomGridToolbar}}
            rows={props.rows || []}
            columns={basicColumns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            checkboxSelection
        />
    );
}
