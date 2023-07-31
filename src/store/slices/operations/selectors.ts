import {RootState} from "../../store";

export const selectOperations = (state: RootState) => state.operation.operations;
export const selectOperationById = (state: RootState, operationId: string) => state.operation.operations.find(operation => operation.id === operationId);
export const selectOperationsStatus = (state: RootState) => state.operation.status;
