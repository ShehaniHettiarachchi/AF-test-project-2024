import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const editUser = () => {
    const { getOne, updateUser, user, setUser } = useContext(UserContext);

    const handleChange = (e) => {
        setUser(e.target.value);
    }
    const { id } = useParams();
    getOne(id);
    console.log(getOne);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            id: id,
            First_Name: e.target.First_Name.value,
            Last_Name: e.target.Last_Name.value,
            Address: e.target.Address.value,
            Email: e.target.Email.value,
            Contact_Number: e.target.Contact_Number.value
        };
        updateUser(newUser);
    };

    return (
        <>
        <h1>Update user details</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name
                    </label>
                    <input
                        type="text"
                        id="First_Name"
                        value={user.First_Name}
                        onChange={handleChange}
                    ></input>

                    <label>
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="Last_Name"
                        value={user.Last_Name}
                        onChange={handleChange}
                    ></input>

                    <label>
                        Address
                    </label>
                    <input
                        type="text"
                        id="Address"
                        value={user.Address}
                        onChange={handleChange}
                    ></input>

                    <label>
                        Email
                    </label>
                    <input
                        type="text"
                        id="Email"
                        value={user.Email}
                        onChange={handleChange}
                    ></input>

                    <label>
                        Contact No
                    </label>
                    <input
                        type="text"
                        id="Contact_Number"
                        value={user.Contact_Number}
                    ></input>

                    <button
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    )
}

export default editUser;