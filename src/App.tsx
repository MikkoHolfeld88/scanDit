import React, {useEffect} from 'react';
import {AppRoutes} from "./routing/approutes";
import Header from "./components/layout/header";
import {Footer} from "./components/layout/footer";
import {useAppDispatch} from "./store/store";
import {setIsBottomBar, setIsOpen} from "./store/slices/sidebar/reducers";
import {useMediaQuery} from "@mui/material";
import './App.css';

function App() {
    const dispatch = useAppDispatch();
    const isTabletOrGreater = useMediaQuery('(min-width: 768px)'); // true if width is 768px or greater
    const isMobileOrLess = useMediaQuery('(max-width: 575px)', { defaultMatches: true }); // true if width is 575px or less

    useEffect(() => {
        dispatch(setIsBottomBar(true));
    }, [])

    useEffect(() => {
        dispatch(setIsOpen(isTabletOrGreater));
        dispatch(setIsBottomBar(isMobileOrLess));
    }, [dispatch, isMobileOrLess, isTabletOrGreater]);

    return (
        <div className="App">
            <Header/>
            <AppRoutes/>
            <Footer/>
        </div>
    );
}

export default App;
