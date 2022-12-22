import specialtyService from "../services/specialtyService";

const createSpecialty = async (req, res) => {
  try {
    let response = await specialtyService.createSpecialty(req.body.data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      meessage: "Error from server",
    });
  }
};

const getAllSpecialty = async (req, res) => {
  try {
    let response = await specialtyService.getAllSpecialty();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      meessage: "Error from server",
    });
  }
};
module.exports = {
  createSpecialty,
  getAllSpecialty,
};
