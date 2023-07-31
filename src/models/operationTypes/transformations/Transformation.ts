import {FileTransformation} from "./FileTransformation";
import {OPERATION_TYPE} from "../../../enums/operationsTypes/operationType.enum";

export type Transformation =
    FileTransformation
    | 'transform-to-table'
    | 'transform-to-text'
    | 'transform-to-list'
    | 'transform-to-bullet-points'
    | 'transform-to-audio'
    | 'transform-to-image'
    | 'transform-to-video';
