import React from 'react';
import './App.css';
import {AppRoutes} from "./routing/approutes";
import Header from "./components/layout/header";
import {Footer} from "./components/layout/footer";

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
