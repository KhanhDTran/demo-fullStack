import express from "express"

let router = express.Router()

let initWebRoute = (app) =>{

    router.get('/', (req, res) => {
        return res.render('home.ejs')
    })
   
    return app.use('/', router)

}

module.exports = initWebRoute