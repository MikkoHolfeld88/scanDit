import {OPERATION_TYPE} from "../../enums/operationsTypes/operationType.enum";

export type OperationType =
    OPERATION_TYPE.EXTRACTION |
    OPERATION_TYPE.GENERATION |
    OPERATION_TYPE.TRANSFORMATION | null;
