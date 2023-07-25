const nodemailer = require('nodemailer')
const fs = require('fs')
const { EMAIL } = require('../config/constants')

// Send email
const sendMail = async (req) => {
  console.log(`res: ${JSON.stringify(req)}`);
  try {
    const transporter = nodemailer.createTransport({
      service: EMAIL.EMAIL_SERVICE,
      auth: {
        user: EMAIL.AUTH_EMAIL_ID,
        pass: EMAIL.AUTH_APP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let data, subject
    if (req.reqOnReviewApprovalStatus) {
      data = fs.readFileSync('./config/adminApprovalEmailTemplate.html', 'utf8')
      subject = 'New request has been sent for your approval!'
    } else if (req.reqOnPasswordReset) {
      data = fs.readFileSync('./config/passwordResetEmailTemplate.html', 'utf8')
      subject = `Your password has been reset!`
    } else if (req.reqOnUpdateApprovalStatus) {
      data = fs.readFileSync('./config/userApprovalStatusEmailTemplate.html', 'utf8')
      subject = `Your request has been ${req.approvalStatus} by admin!`
    } else if (req.reqOnGrantAdminAccess) {
      data = fs.readFileSync('./config/userGrantAdminAccessEmailTemplate.html', 'utf8')
      subject = `Your have been ${req.isAdmin} as "Admin" privileges by admin!`
    } else {
      console.error(`Failed to send mail!!`)
      return { emailSent: false }
    }

    // console.log(`HTML data, ${data}`);
    data = data.replaceAll('#lastName', req.lastName)
    data = data.replaceAll('#firstName', req.firstName)
    data = data.replaceAll('#mobile', req.mobile)
    data = data.replaceAll('#emailId', req.emailId)
    data = data.replaceAll('#designation', req.designation)
    data = data.replaceAll('#govtIDNumber', req.govtIDNumber)
    data = data.replaceAll('#appURL', EMAIL.APPLICATION_URL)
    data = data.replaceAll('#approvalStatus', req.approvalStatus)
    data = data.replaceAll('#resetPassword', req.password)
    data = data.replaceAll('#isAdmin', req.isAdmin)
    // console.log(`HTML replaced data, ${data}`);

    const mailOptions = {
      from: EMAIL.DONOT_REPLY_EMAIL_ID,
      to: req.emailIdList,
      subject,
      html: data
    }

    const result = await transporter.sendMail(mailOptions)
    console.log(`Result: ${JSON.stringify(result)}`);
    return { emailSent: true };
  } catch (err) { // Error in catch block
    console.error(`Failed to send mail, ${err}`)
    return { emailSent: false, error: `${err}` }
  }
}

module.exports = {
  sendMail
}
