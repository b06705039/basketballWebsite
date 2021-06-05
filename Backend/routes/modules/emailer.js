var nodemailer = require("nodemailer");
var config = require("./config");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: config.AdministerEmail,
});

const SendRemindEmail = async (userInfo) => {
  const { account, username, password, email, department } = userInfo;
  var mailOptions = {
    from: config.AdministerEmail.user,
    to: email,
    subject: "[NTUGirlBasketBall Web Team] Your userInfo remider",
    text: `
Dear ${username}, your userInfo are as followed.

    Account: ${account}

    Password: ${password}

    Email: ${email}

    Department: ${department}

If there's any question. Please contact ${config.AdministerEmail.user}.

NTUGirlBasketBall Web Team
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const SendCreateEmail = async (userInfo) => {
  console.log(userInfo);
  const { username, email } = userInfo;
  var mailOptions = {
    from: config.AdministerEmail.email,
    to: email,
    subject: "[NTUGirlBasketBall Web Team] Create Account Success",
    text: `
Dear ${username}, your account has been created, but still you have to wait for adiminister to active your account.
NTUGirlBasketBall Web Team
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.SendRemindEmail = SendRemindEmail;
module.exports.SendCreateEmail = SendCreateEmail;
