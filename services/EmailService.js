const nodemailer = require("nodemailer");

exports.sendEmail = async (email, password) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "25955a1b42f8b9",
        pass: "ec5f06ad3249a0",
      },
    });
    const mailOptions = {
      from: "iamdanishsiddique@gmail.com",
      to: email,
      subject: "Registration Success",
      text: `Email : ${email}, Your Password is : ${password}`,
    };

    transport.sendMail(mailOptions, function (error, info) {
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
