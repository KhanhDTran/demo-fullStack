import axios from "axios";

const loginApi = (email, password) => {
    return axios.get('/api/login', { email, password })
}



export { loginApi }