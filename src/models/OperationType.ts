import {Extraction} from "./Extraction";
import {Generation} from "./Generation";
import {Transformation} from "./Transformation";
import {Export} from "./Export";

export type OperationType =
    'prepare-data' |
    Extraction |
    'summarization' |
    Generation |
    'translation' |
    'classification' |
    'sentiment' |
    Transformation |
    'calculation' |
    'comparison' |
    'export';
