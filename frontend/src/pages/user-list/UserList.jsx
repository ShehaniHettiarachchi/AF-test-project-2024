import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const UserList = () => {
    const {users, deleteUser } = useContext(UserContext);

    return(
        <>
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
                    .map((user) => (
                        <tbody>
                            <tr>
                                <td>
                                    {user.First_Name}
                                </td>
                                <td>
                                    {user.Last_Name}
                                </td>
                                <td>
                                    {user.Address}
                                </td>
                                <td>
                                    {user.Email}
                                </td>
                                <td>
                                    {user.Contact_Number}
                                </td>
                                <td>
                                    <Link to={`/update/${user._id}`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(user._id)}>
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