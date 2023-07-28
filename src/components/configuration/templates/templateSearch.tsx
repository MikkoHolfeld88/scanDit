import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useSelector} from "react-redux";
import {selectSearchValue, selectTemplates} from "../../../store/slices/template/selectors";
import {Template} from "../../../models/Template";
import {useEffect} from "react";
import {AppDispatch, useAppDispatch} from "../../../store/store";
import {setTemplateSearch} from "../../../store/slices/template/reducers";

export const TemplateSearch = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const searchValue: string | null= useSelector(selectSearchValue);
    const templates: Template[] = useSelector(selectTemplates)
    const [templateSearchOptions, setTemplateSearchOptions] = React.useState<string[]>([]);

    useEffect(() => {
        const templateSearchOptions: string[] = templates.map(template => template.name);
        setTemplateSearchOptions(templateSearchOptions);
    }, [templates])

    return (
        <Autocomplete
            id="template-search"
            value={searchValue}
            onChange={(event: any, newValue: string | null) => {dispatch(setTemplateSearch(newValue));}}
            options={templateSearchOptions}
            fullWidth
            renderInput={(params) =>
                <TextField {...params} label="Template name" variant="standard"/>}
        />
    );
}
