import userService from "../services/userService"
import db from "../models/index"

let createUser = async (req, res) => {
    let data = req.body
    if (checkUserParameter(data)) {
        return res.status(400).json({errCode: 1, message: "missing parameter"})
    }
    if(await checkEmail(data.email)){
        return res.status(400).json({errCode: 2, message: "email already exist"})
    }
    try {
        let response = await userService.createUser(data)
        if (response) {
            return res.status(200).json({errCode: 0, message: "User created"})
        }
    } catch (e) {
        console.log(e)
    }
   
   
}

let updateUser = async (req,res) => {
    let data = req.body
    if(!data.id || !data.email || !data.firstName || !data.lastName){
        return res.status(400).json({errCode: 1, message:"Missing parameter"})
    }
    let user= await getUserById(data.id)
    if(!user){
        return res.status(400).json({errCode: 2, message: "user not exist"})
    }
    try {
        let response = await userService.updateUser(data)
        if(response){
            return res.status(200).json({errCode: 0, message: "User updated"})
        }
    } catch (e) {
        console.log(e)
    }
    
}

let deleteUser = async (req, res) => {
    let data = req.body
    console.log(data.id)
    if(!data.id ){
        return res.status(400).json({errCode: 1, message:"Missing parameter"})
    }
    let user= await getUserById(data.id)
    if(!user){
        return res.status(400).json({errCode: 2, message: "user not exist"})
    }
    try{
        let response = await userService.deleteUser(data.id)
        if(response){
            return res.status(200).json({errCode: 0, message: "user deleted"})
        }
    }catch(e){
        console.log(e)
    }
}

let getUser = async (req, res) => {
    let id = req.body.id
    console.log(id)
    if(!id){
        let users = await getAllUser()
        if(users){
            return res.status(200).json({errCode: 0, message:"Users found", users: users})
        }
    }else{
        let user = await getUserById(id)
        if(user){
            return res.status(200).json({errCode: 0, message:"User found", user: user})
        }else{
            return res.status(400).json({errCode: 1, message:"User not exist"})
        }
    }
    
    
}


let getAllUser =  () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll()
            for(let i =0 ; i < users.length; i ++) {
                users[i].password = undefined
                delete users[i].password
            }
            users ? resolve(users) : resolve(undefined)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserById = (id) =>{
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
    if(!data.email || !data.password || !data.firstName || !data.lastName || !data.address || !data.roleId || !data.positionId)
    {
        return true
    }else{
        return false
    }
}

module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser, 
    getUser: getUser,
}