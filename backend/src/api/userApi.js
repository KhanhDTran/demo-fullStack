import userService from "../services/userService"



let createUser = async (req, res) => {
    let data = req.body
    if (userService.checkUserParameter(data)) {
        return res.status(200).json({ errCode: 1, message: "missing parameter" })
    }
    if (await userService.checkEmail(data.email)) {
        return res.status(200).json({ errCode: 2, message: "email already exist" })
    }
    try {
        let response = await userService.createUser(data)
        if (response) {
            return res.status(200).json({ errCode: 0, message: "User created" })
        }
    } catch (e) {
        console.log(e)
    }


}

let updateUser = async (req, res) => {
    let data = req.body
    if (!data.id) {
        return res.status(200).json({ errCode: 1, message: "Missing parameter" })
    }
    let user = await userService.getUserById(data.id)
    if (!user) {
        return res.status(200).json({ errCode: 2, message: "user not exist" })
    }
    try {
        let response = await userService.updateUser(data)
        if (response) {
            return res.status(200).json({ errCode: 0, message: "User updated" })
        }
    } catch (e) {
        console.log(e)
    }

}

let deleteUser = async (req, res) => {
    let data = req.body
    console.log("----------------------------------", data)
    if (!data.id) {
        return res.status(200).json({ errCode: 1, message: "Missing parameter" })
    }
    let user = await userService.getUserById(data.id)
    if (!user) {
        return res.status(200).json({ errCode: 2, message: "user not exist" })
    }
    try {
        let response = await userService.deleteUser(data.id)
        if (response) {
            return res.status(200).json({ errCode: 0, message: "user deleted" })
        }
    } catch (e) {
        console.log(e)
    }
}

let getUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        let users = await userService.getAllUser()
        if (users) {
            return res.status(200).json({ errCode: 0, message: "Users found", users: users })
        }
    } else {
        let user = await userService.getUserById(id)
        if (user) {
            return res.status(200).json({ errCode: 0, message: "User found", user: user })
        } else {
            return res.status(200).json({ errCode: 1, message: "User not exist" })
        }
    }
}




module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUser: getUser,
}