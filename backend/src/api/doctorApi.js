import docterService from '../services/doctorService'

const getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10
    try {
        let response = await docterService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

const getAllDoctor = async (req, res) => {
    try {
        let response = await docterService.getAllDoctor()
        console.log(response)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

const createDoctorInfo = async (req, res) => {
    try {
        let response = await docterService.createDoctorInfo(req.body.data)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    createDoctorInfo: createDoctorInfo,

}