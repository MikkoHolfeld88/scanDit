import {TargetType} from "./TargetType";

export interface Target {
    data?: any;
    dataUrl?: string;
    type: TargetType;
}
