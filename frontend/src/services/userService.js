import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,

});

const loginApi = (email, password) => {
    return instance.post('/api/login', { email: email , password: password})
}



export { loginApi }