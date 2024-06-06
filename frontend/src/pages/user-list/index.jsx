import React from "react";
import UserList from "./UserList";

import { UserProvider } from "../../contexts/UserContext";

const index = () => {
    return (
        <>
            <UserProvider>
                <UserList/>
            </UserProvider>
        </>
    );
};

export default index;