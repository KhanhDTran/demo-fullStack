import express from "express"
require('dotenv').config()
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoute from "./routes/web"
import connectDb from "./config/connectDb"


let app = express()
connectDb()



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

viewEngine(app)
initWebRoute(app)

let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    return console.log(PORT)
})




