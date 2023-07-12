import {PromptDescription} from "./PromptDescription";

export interface Prompt {
    id: string,
    name?: string,
    description?: PromptDescription,
    created: string,
    text: string,
}
