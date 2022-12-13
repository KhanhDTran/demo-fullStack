import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,

});

const loginApi = (email, password) => {
    return instance.post('/api/login', { email: email, password: password })
}

const getUsersApi = () => {
    return instance.get('/api/users')
}

const createUserApi = (email, password, address, firstName, lastName, phoneNumber) => {
    return instance.post('/api/create-user', { email, password, address, firstName, lastName, phoneNumber })
}

const deleteUserApi = (id) => {
    return instance.delete('/api/delete-user', { data: { id: id } })
}

const updateUserApi = (id, email, address, firstName, lastName, phoneNumber) => {
    return instance.put('/api/update-user', { id, email, address, firstName, lastName, phoneNumber })
}

const getAllCodeApi = (inputType) => {
    return instance.get(`/api/allcodes?type=${inputType}`)
}


export { loginApi, getUsersApi, createUserApi, deleteUserApi, updateUserApi, getAllCodeApi }