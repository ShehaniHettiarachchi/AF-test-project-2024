import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const UserCreate = () => {
    const { addUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            First_Name: e.target.First_Name.value,
            Last_Name: e.target.Last_Name.value,
            Address: e.target.Address.value,
            Email: e.target.Email.value,
            Contact_Number: e.target.Contact_Number.value
        };
        addUser(newUser);
    };

    return (
        <>
            <h1>Create user</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name
                    </label>
                    <input
                        type="text"
                        id="First_Name"
                    ></input>

                    <label>
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="Last_Name"
                    ></input>

                    <label>
                        Address
                    </label>
                    <input
                        type="text"
                        id="Address"
                    ></input>

                    <label>
                        Email
                    </label>
                    <input
                        type="text"
                        id="Email"
                    ></input>

                    <label>
                        Contact No
                    </label>
                    <input
                        type="text"
                        id="Contact_Number"
                    ></input>

                    <button
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
};

export default UserCreate;
