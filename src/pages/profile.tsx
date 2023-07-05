import React from "react";
import { getAuth } from "firebase/auth";

export const Profile = () => {

    return (
        <div>
            <h1>Profile</h1>
            <h5>{getAuth().currentUser?.email}</h5>
            <h5>{getAuth().currentUser?.uid}</h5>
        </div>
    );
}
