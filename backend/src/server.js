import express from "express"
require('dotenv').config()
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoute from "./routes/web"
import connectDb from "./config/connectDb"

let cors = require('cors')
let app = express()
connectDb()


app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

viewEngine(app)

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


initWebRoute(app)



let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    return console.log(PORT)
})




