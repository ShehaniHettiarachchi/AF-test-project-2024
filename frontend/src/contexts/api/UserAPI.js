import axios from "axios";
import requestConfig from "./requestConfig";
import requestConfigJson from "./requestConfigJson";

//const BASE_URL=import.meta.env.BACKEND_URL;
const BASE_URL="http://localhost:5000";

class UserAPI {
    //----------------create user----------//
    static createUser(newUser) {
        return axios.post(`${BASE_URL}/user/add/`, newUser, requestConfigJson);
        //return axios.post(`${BASE_URL}/user/add/`, newUser);
    }

    //----------------Get all users-------//
    static getAll() {
        return axios.get(`${BASE_URL}/user`, requestConfigJson);
        //return axios.get(`${BASE_URL}/`);
    }

    //---------------Get one user -------//
    static getOne(id) {
        return axios.get(`${BASE_URL}/user/get/${id}`, requestConfig);
    }

    //---------------Delete user --------//
    static deleteUser(id) {
        return axios.delete(`${BASE_URL}/user/delete/${id}`, requestConfig);
    }

    //--------------Update user --------//
    static updateUser(id, newUser) {
        return axios.put(`${BASE_URL}/user/update/${id}`,newUser, requestConfigJson);
    }

    //------------- Get all books -----//
    static getAllBooks() {
        return axios.get(`${BASE_URL}/books`);
    }

    //-------------- Search user -----//
    static searchUser(query) {
        return axios.get(`${BASE_URL}/search`, { params: { query } }, requestConfig);
    }

    //------------- Search Books -----//
    static searchBooks(query) {
        return axios.get(`${BASE_URL}/search`, { params: {query} })
    }

    //------------ Purchase Books ----//
    static purchaseBooks(id, newBook) {
        return axios.post(`${BASE_URL}/books/purchase/${id}`, newBook)
    }

    //------------ Selected Books ----//
    static selectedBooks(id) {
        return axios.get(`${BASE_URL}/books/purchase/${id}`);
    }
}

export default UserAPI;