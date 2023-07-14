import {SourceType} from "./SourceType";

export interface Source {
    data?: any;
    dataUrl?: string;
    type: SourceType;
}
