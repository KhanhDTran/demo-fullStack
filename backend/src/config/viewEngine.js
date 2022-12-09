import exress from "express"


let viewEngine = (app) => {
    app.use(exress.static('./public'))
    app.set('view engine', 'ejs');
    app.set('views', "./src/views")
}

module.exports = viewEngine