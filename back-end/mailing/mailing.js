const nodemailer = require("nodemailer");

module.exports.sendingMail = async ({ from, to, subject, text }) => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    };
    //asign createTransport method in nodemailer to a variable
    //service: to determine which email platform to use
    //auth contains the senders email and password which are all saved in the .env
    // console.log("user", process.env.email, process.env.emailpassword);
    const Transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.emailpassword,
      },
    });

    //return the Transporter variable which has the sendMail method to send the mail
    //which is within the mailOptions
    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
