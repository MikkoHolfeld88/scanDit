import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTE_PATHS} from "./routePaths";
import {SignInPage} from "../pages/signin";
import {RegisterPage} from "../pages/register";
import React, {useEffect} from "react";
import {auth} from "../firebase/firebase";
import {Home} from "../pages/home";
import Sidebar from "../components/sidebar";
import {DashboardRoutes} from "./dashboardroutes";

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

export const AppRoutes = () => {
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
            <Route path={ROUTE_PATHS.BASE} element={<Home/>}/>
            <Route path={ROUTE_PATHS.HOME} element={<Navigate to={ROUTE_PATHS.BASE}/>}/>
            <Route path={ROUTE_PATHS.SIGN_IN} element={<SignInPage/>}/>
            <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage/>}/>
            <Route
                path={ROUTE_PATHS.DASHBOARD}
                element={
                    <ProtectedRoute
                        loggedIn={loggedIn}
                        redirectPath={ROUTE_PATHS.SIGN_IN}>
                        <Sidebar />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
