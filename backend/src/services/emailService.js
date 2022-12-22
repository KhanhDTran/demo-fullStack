require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  // async..await is not allowed in global scope, must use a wrapper

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    service: "Gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated gmail user
      pass: process.env.ENAIL_APP_PASSWORD, // generated gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Khanh D Tran 👻" <trandanhkhanh@gmailcom>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject:
      dataSend.language === "vi"
        ? "Thông tin đặt lịch khám bệnh"
        : "Health booking appoitment information", // Subject line
    // text: "Hello world?", // plain text body
    html: getBodyHTML(dataSend),
  });
};

let getBodyHTML = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.patientName}<h3/>
        <p>Bạn nhận được email vì đã đặt lịch khám bệnh online của HealthBooking<p/>
        <p>Thông tin đặt lịch khám bệnh<p/>
        <div>Thời gian: ${dataSend.time}</div>
        <div>Bác Sĩ: ${dataSend.doctorName}</div>
        <p>Nếu người đặt lịch đúng là bạn, vui lòng click vào đường link bênh dưới để xác nhận hoàn tất thủ tục
        đặt lịch khám bệnh<p/>
        <div><a href=${dataSend.redirectLink} target="_blank">Click Here<a/></div>
        <p>Xin chân thành cảm ơn<p/>
        `;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear${dataSend.patientName}<h3/>
        <p>You've received a booking appointment from HealthBooking<p/>
        <p>Health Booking appointment information<p/>
        <div>Time: ${dataSend.time}</div>
        <div>Doctor: ${dataSend.doctorName}</div>
        <p>If youre the person who booking, please click on this link to confirm<p/>
        <div><a href=${dataSend.redirectLink} target="_blank">Click Here<a/></div>
        <p>Thank you<p/>
        `;
  }
  return result;
};
module.exports = { sendSimpleEmail };
