const nodemailer = require("nodemailer");

exports.sendEmail = async (email, password) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "carmen15@ethereal.email", // generated ethereal user
        pass: "ddHFrMHs6sZWJ7Zwh9", // generated ethereal password
      },
    });
    const mailOptions = {
      from: process.env.MAILER_USER,
      to: email,
      subject: "Registration Success",
      text: `Your Password is : ${password}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return true;
  } catch (e) {
    return false;
  }
};
