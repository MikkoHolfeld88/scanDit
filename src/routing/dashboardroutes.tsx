import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTE_PATHS} from "./routePaths";
import {SignInPage} from "../pages/signin";
import {RegisterPage} from "../pages/register";
import React, {useEffect} from "react";
import {auth} from "../firebase/firebase";
import {Home} from "../pages/home";
import {Upload} from "../pages/upload";
import {Configuration} from "../pages/configuration";

interface ProtectedRouteProps {
    loggedIn: boolean,
    redirectPath?: string,
    children: any,
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    if (!props.loggedIn) {
        return <Navigate to={props.redirectPath ? props.redirectPath : ROUTE_PATHS.SIGN_IN} replace/>;
    }

    return props.children;
};

export const DashboardRoutes = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, []);

    return (
        <Routes>
            <Route path={ROUTE_PATHS.UPLOAD} element={<Upload />} />
        </Routes>
    );
};
