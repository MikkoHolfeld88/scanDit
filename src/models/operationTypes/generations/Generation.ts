import {OPERATION_TYPE_GENERATION} from "../../../enums/operationsTypes/generations/operationType_generations.enum";

export type Generation =
    OPERATION_TYPE_GENERATION.TEXT_GENERATION |
    OPERATION_TYPE_GENERATION.IMAGE_GENERATION |
    OPERATION_TYPE_GENERATION.AUDIO_GENERATION
