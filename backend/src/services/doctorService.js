import db from "../models/index"

const getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                // order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password', 'image'],
                },
                include: [
                    // { models: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    { models: db.Allcode, as: 'genderData', attributes: ['valueVi', 'valueEn'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome
}