import React, {useEffect} from 'react';
import './App.css';
import {AppRoutes} from "./routing/approutes";
import Header from "./components/layout/header";
import {Footer} from "./components/layout/footer";
import {useAppDispatch} from "./store/store";
import {setIsBottomBar, setIsOpen} from "./store/slices/sidebar/reducer";
import {useMediaQuery} from "@mui/material";

function App() {
    const dispatch = useAppDispatch();
    const isTabletOrGreater = useMediaQuery('(min-width: 768px)'); // true if width is 768px or greater
    const isMobileOrLess = useMediaQuery('(max-width: 575px)'); // true if width is 575px or less

    useEffect(() => {
        dispatch(setIsOpen(isTabletOrGreater));
        dispatch(setIsBottomBar(isMobileOrLess))
    }, [dispatch, isTabletOrGreater, isMobileOrLess]);

    return (
        <div className="App">
            <Header/>
            <AppRoutes/>
            <Footer/>
        </div>
    );
}

export default App;
