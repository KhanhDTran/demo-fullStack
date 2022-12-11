import db from "../models/index"
const bcrypt = require('bcrypt');
const saltRounds = 10;


let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = hashPassword(data.password)
            console.log(hashedPassword, '----------------------------')
            await db.User.create({
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                image: '',
                roleId: data.roleId,
                positionId: data.positionId
            })
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update({
                // email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                image: '',
                positionId: user.positionId
            },
                { where: { id: user.id } })
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })

}

let deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({ where: { id: id } })
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}

let hashPassword = (password) => {
    try {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        return (hash)
    } catch (e) {
        console.log(e)
    }
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll()
            for (let i = 0; i < users.length; i++) {
                users[i].password = undefined
                delete users[i].password
            }
            users ? resolve(users) : resolve(undefined)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } })
            user.password = undefined
            delete user.password
            user ? resolve(user) : resolve(undefined)
        } catch (e) {
            reject(e)
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: email } })
            user ? resolve(user) : resolve(undefined)

        } catch (e) {
            reject(e)
        }
    })
}

let checkUserParameter = (data) => {
    if (!data.email || !data.password || !data.firstName || !data.lastName || !data.address) {
        return true
    } else {
        return false
    }
}


module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    checkEmail: checkEmail,
    getUserById: getUserById,
    getAllUser: getAllUser,
    checkUserParameter: checkUserParameter

}
