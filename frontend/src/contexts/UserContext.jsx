import { createContext, useState, useEffect } from "react";
import UserAPI from "./api/UserAPI";

const UserContext = createContext();

export function UserProvider({ children }) {

    //for retrieve all user values-- []
    const [users, setUsers] = useState([]);

    //for retrieve one user value-- {}
    const [user, setUser] = useState({
        First_Name: "",
        Last_Name: "",
        Address: "",
        Email: "",
        Contact_Number: ""
    });

    //-------------- Add User ---------//
    const addUser = async (newUser) => {
        try {
            const response = await UserAPI.createUser(newUser);
            setUsers([...users, response.data]);
            alert("User added successfully!");

        } catch (error) {
            console.log(error);
        }
    }

    //---------------Get all users------//
    useEffect(() => {
        UserAPI.getAll().then((response) => {
            setUsers(response.data);
        });
    }, []);

    //--------------Get one user-------//
	const getOne = (id) => {
		useEffect(() => {
		UserAPI.getOne(id).then((res) => {
				setUser(res.data);
			});
		}, []);
	};

    //--------------Delete user-------//
    const deleteUser = (id) => {
        UserAPI.deleteUser(id).then(() => {
            setUsers(users.filter((users)=> users._id !== id));
            alert("User deleted successfully");
        });
    };

    //-------------Update user -------//
    const updateUser = (values) => {
        const newUser = {
            First_Name: values.First_Name,
            Last_Name: values.Last_Name,
            Address: values.Address,
            Email: values.Email,
            Contact_Number: values.Contact_Number
        };

        UserAPI.updateUser(values.id, newUser)
            .then((response)=> {
                alert("User updated successfully!");
            })
            .catch((error) => {
                console.log(error);
            })
    };

    //------------ Search user ------//
    const searchUsers = async (query) => {
        try {
            const response = await UserAPI.searchUser(query);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <UserContext.Provider
            value={{
                setUsers,
                setUser,
                users,
                user,
                addUser,
                getOne,
                deleteUser,
                updateUser,
                searchUsers
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;