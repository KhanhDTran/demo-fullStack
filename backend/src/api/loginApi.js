import userService from "../services/userService"
const bcrypt = require('bcrypt');


let handleLogin = async (req, res) => {
    let data = req.body
    if (!data.email || !data.password) {
        return res.status(200).json({ errCode: 1, message: "Missing parameter" })
    } else {
        let user = await userService.checkEmail(data.email)
        if (user) {
            if (bcrypt.compareSync(data.password, user.password)) {
                user.password = undefined
                delete user.password
                return res.status(200).json({ errCode: 0, message: "Login success", user: user })
            } else {
                return res.status(200).json({ errCode: 2, message: "Wrong password" })
            }
        } else {
            return res.status(200).json({ errCode: 3, message: "User not exist" })
        }
    }

}


module.exports = {
    handleLogin: handleLogin
}