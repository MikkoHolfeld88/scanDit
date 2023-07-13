import {Extraction} from "./Extraction";
import {Generation} from "./Generation";
import {Transformation} from "./Transformation";

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
