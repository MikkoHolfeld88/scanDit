import React, {useEffect} from "react";
import {logout} from "../firebase/authentication";

export const Logout = () => {
    useEffect(() => {logout()}, []);

    return (<div />);
}
