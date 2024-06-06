import React from "react";
import UserCreate from "./UserCreate";

//User provider
import { UserProvider } from "../../contexts/UserContext";

const index = () => {
    return (
        <>
            <UserProvider>
                <UserCreate/>
            </UserProvider>
        </>
    );
};

export default index;