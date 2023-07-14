import {FileTransformation} from "./FileTransformation";

export type Transformation = FileTransformation | 'transform-to-table' | 'transform-to-text' | 'transform-to-list' | 'transform-to-bullet-points' | 'transform-to-audio' | 'transform-to-image' | 'transform-to-video';
