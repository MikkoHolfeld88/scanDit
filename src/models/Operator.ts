import {Export} from "./operationTypes/exports/Export";

export interface Operator {
    type: 'import' | 'prompt' | 'transform' | Export,
    prompt?: string,
    transformer?: any,
}
