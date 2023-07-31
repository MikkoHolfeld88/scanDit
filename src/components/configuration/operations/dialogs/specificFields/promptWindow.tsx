import {TextField} from "@mui/material";
import * as React from "react";

interface PromptWindowProps {
    prompt: string;
    setPrompt: (prompt: string) => void
}

export const PromptWindow = (props: PromptWindowProps) => {
    return (
        <TextField
            required
            sx={{mb: 1, mt: 1}}
            variant="outlined"
            label="Prompt"
            onChange={(e) => props.setPrompt(e.target.value)}
            value={props.prompt}
            multiline
            rows={4}
            fullWidth/>
    )
}
