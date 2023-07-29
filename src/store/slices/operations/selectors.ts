import {RootState} from "../../store";

export const selectOperations = (state: RootState) => state.operation.operations;
