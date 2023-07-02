import React, {useEffect} from "react";
import {logout} from "../firebase/signin";

export const Logout = () => {
    useEffect(() => {logout()}, []);

    return (<div />);
}
