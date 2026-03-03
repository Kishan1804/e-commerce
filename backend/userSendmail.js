const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config();


const userSendMail = (email, fullname, message) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Test mail",
        html: `<!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
               
                </head>

                <body style="background-color: #e9ecef;">

                <h1>Email ------- ${email}</h1>
                <h4>Full Name ------- ${fullname} </h4>
                <p>Message ------- ${message}</p>

                </body>
                </html>
`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return err
        return info
    })
}

module.exports = userSendMail