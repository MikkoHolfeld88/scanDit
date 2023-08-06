import {RootState} from "../../store";

export const selectOperations = (state: RootState) => state.operation.operations;
export const selectOperationById = (state: RootState, operationId: string) => state.operation.operations.find(operation => operation.id === operationId);
export const selectOperationsStatus = (state: RootState) => state.operation.status;
export const selectLatestCreatedOperation = (state: RootState) => {
    const operationsCopy = [...state.operation.operations];
    return operationsCopy.sort((a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )[0];
}
