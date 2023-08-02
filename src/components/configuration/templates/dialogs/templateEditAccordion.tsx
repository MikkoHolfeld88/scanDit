import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TemplateType} from "../../../../models/TemplateType";
import {TEMPLATE_TYPE} from "../../../../enums/templateType.enum";
import MenuItem from "@mui/material/MenuItem";
import {primaryGrey, primaryGreyStrong, primaryMain} from "../../../../style/theme";

interface TemplateEditionAccordionProps {
    expanded: boolean,
    setExpanded: (open: boolean) => void,
    name: string,
    setName: (name: string) => void,
    description: string,
    setDescription: (description: string) => void,
    author: string,
    setAuthor: (author: string) => void,
    type: TemplateType,
    setType: (type: TemplateType) => void
}

export const TemplateEditAccordion = (props: TemplateEditionAccordionProps) => {
    const handleChange = () => {
        props.setExpanded(!props.expanded);
    }

    return (
        <Accordion
            style={{
                marginTop: "5px",
                border: `1px solid ${primaryGreyStrong}`,
                color: primaryMain,
                borderRadius: "4px"
            }}
            expanded={props.expanded}
            onChange={handleChange}
            elevation={0}>
            <AccordionSummary
                style={{
                    margin: 0,
                    backgroundColor: primaryGrey,
                    border: `1px solid ${primaryGreyStrong}`,
                    borderRadius: "4px",
                }}
                expandIcon={<ExpandMoreIcon style={{color: primaryMain}}/>}
                id={`template-accordtion-${props.name}`}>
                <Typography variant="subtitle2">DETAILS</Typography>
            </AccordionSummary>
            <AccordionDetails style={{margin: 4, padding: 4}}>
                <FormControl fullWidth required sx={{mt: 1, mb: 1}}>
                    <InputLabel id="template-type-label-edit">Type</InputLabel>
                    <Select
                        labelId="template-type-label-edit"
                        label="Type"
                        value={props.type ?? ""}
                        onChange={(e) => props.setType(e.target.value as TemplateType)}>
                        {
                            Object.keys(TEMPLATE_TYPE).map((key) => {
                                return <MenuItem key={key} value={TEMPLATE_TYPE[key as keyof typeof TEMPLATE_TYPE]}>{key}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <TextField
                    required
                    sx={{mb: 1, mt: 1}}
                    variant="outlined"
                    label="Name"
                    onChange={(e) => props.setName(e.target.value)}
                    value={props.name}
                    fullWidth/>
                <TextField
                    sx={{mb: 1, mt: 1}}
                    variant="outlined"
                    label="Author"
                    onChange={(e) => props.setAuthor(e.target.value)}
                    value={props.author}
                    fullWidth/>
                <TextField
                    sx={{mb: 1, mt: 1}}
                    variant="outlined"
                    label="Description"
                    onChange={(e) => props.setDescription(e.target.value)}
                    value={props.description}
                    multiline
                    rows={4}
                    fullWidth/>
            </AccordionDetails>
        </Accordion>
    )
}
