import express from "express"
import userApi from "../api/userApi"
import loginApi from "../api/loginApi"
import doctorApi from '../api/doctorApi'



require('dotenv').config()

let router = express.Router()

let initWebRoute = (app) => {

    router.get('/', (req, res) => {
        return res.render('home.ejs')
    })

    router.get('/api/users', userApi.getUser)
    router.post('/api/create-user', userApi.createUser)
    router.put('/api/update-user', userApi.updateUser)
    router.delete('/api/delete-user', userApi.deleteUser)

    router.post('/api/login', loginApi.handleLogin)

    router.get('/api/allcodes', userApi.getAllCode)

    router.get('/api/top-doctor-home', doctorApi.getTopDoctorHome)

    return app.use('/', router)

}

module.exports = initWebRoute