import express from "express"
import userApi from "../api/userApi"

let router = express.Router()

let initWebRoute = (app) =>{

    router.get('/', (req, res) => {
        return res.render('home.ejs')
    })

    router.get('/api/users', userApi.getUser)
    router.post('/api/create-user', userApi.createUser)
    router.put('/api/update-user', userApi.updateUser)
    router.delete('/api/delete-user', userApi.deleteUser)
   
    return app.use('/', router)

}

module.exports = initWebRoute