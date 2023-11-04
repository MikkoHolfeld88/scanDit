import React from 'react';
import {AppRoutes} from "./routing/approutes";
import Header from "./components/layout/header";
import {Footer} from "./components/layout/footer";
import './App.css';

function App() {

    return (
        <div className="App">
            <Header/>
            <AppRoutes/>
            <Footer/>
        </div>
    );
}

export default App;
