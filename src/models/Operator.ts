import {Export} from "./Export";

export interface Operator {
    type: 'prompt' | Export,
    text?: string,
    transformer?: any,
}
