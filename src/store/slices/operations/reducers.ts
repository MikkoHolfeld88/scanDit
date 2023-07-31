import {createSlice} from '@reduxjs/toolkit';
import {OperationState} from "./types";
import {FETCHING_STATE} from "../../../enums/fetchingState.enum";
import {fetchOperations} from "./thunks";

const initialState: OperationState = {
    operations: [],
    status: FETCHING_STATE.IDLE,
    error: undefined
}

export const operationSlice = createSlice({
    name: 'operation',
    initialState,
    reducers: {
        setOperations: (state, action) => {
            state.operations = action.payload;
        },
        addOperation: (state, action) => {
            state.operations.push(action.payload);
        },
        editOperation: (state, action) => {
            const operation = state.operations.find(operation => operation.id === action.payload.id);
            if (operation) {
                if (action.payload.type !== undefined) {
                    operation.type = action.payload.type;
                }
                if (action.payload.description !== undefined) {
                    operation.description = action.payload.description;
                }
                if (action.payload.deleted !== undefined) {
                    operation.deleted = action.payload.deleted;
                }
                if (action.payload.author !== undefined) {
                    operation.author = action.payload.author;
                }
                operation.updated = new Date().toISOString();
            }
        },
        deleteOperation: (state, action) => {
            state.operations = state.operations.filter(operation => operation.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOperations.pending, (state) => {
            state.status = FETCHING_STATE.LOADING;
        });
        builder.addCase(fetchOperations.fulfilled, (state, action) => {
            state.status = FETCHING_STATE.SUCCEEDED;
            state.operations = action.payload;
        });
        builder.addCase(fetchOperations.rejected, (state, action) => {
            state.status = FETCHING_STATE.FAILED;
            state.error = action.error.message;
        })
    }
});

export const {addOperation, editOperation, deleteOperation} = operationSlice.actions;

export default operationSlice.reducer;
