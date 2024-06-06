import React from "react";
import UserEdit from "./UserEdit";
import { UserProvider } from "../../contexts/UserContext";

const index = () => {
    return (
        <>
            <UserProvider>
                <UserEdit/>
            </UserProvider>
        </>
    );
};

export default index;