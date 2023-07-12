import {Extraction} from "./Extraction";

export type OperationType =
    Extraction |
    'summarization' |
    'generation' |
    'translation' |
    'classification' |
    'sentiment' |
    'calculation';
