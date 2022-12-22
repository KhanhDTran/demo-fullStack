import patientService from "../services/patientService";

const postBookAppointment = async (req, res) => {
  try {
    let response = await patientService.postBookAppointment(req.body.data);
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
  postBookAppointment,
};
