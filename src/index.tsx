import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {Provider} from "react-redux"
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {MUITheme} from "./style/theme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={MUITheme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);


