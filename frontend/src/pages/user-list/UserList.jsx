import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const UserList = () => {
    const {users, deleteUser, searchUsers  } = useContext(UserContext);

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        searchUsers(searchQuery);
    };

    return(
        <>
            <input
                type="text"
                placeholder="Search by First Name or Last Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {users
                    .map((users) => (
                        <tbody>
                            <tr>
                                <td>
                                    {users.First_Name}
                                </td>
                                <td>
                                    {users.Last_Name}
                                </td>
                                <td>
                                    {users.Address}
                                </td>
                                <td>
                                    {users.Email}
                                </td>
                                <td>
                                    {users.Contact_Number}
                                </td>
                                <td>
                                    <Link to={`/update/${users._id}`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(users._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
                <br></br>
                <button>
                    <Link 
                        to="/add"
                        type="submit" >
                            Add User
                    </Link>
                </button>
            </table>
        </>
    );
};

export default UserList;
