const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendGridKey);
const sendEmail = (email, token) => {
    sgMail.send({
        to: email,
        from : 'no-reply@matchmeunt.com',
        subject: 'Thanks for using our service, change your password with the link below',
        html : `
        
        <div style="text-align: center;">
          <h3>Go to the following link to reset your password</h3>
          <div>
            <a href="${keys.redirectDomain}/reset/${token}">${keys.redirectDomain}/reset/${token}</a>
          </div>
        </div>
      `
    })
}
module.exports = {
    sendEmail
};