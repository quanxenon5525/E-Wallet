const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "test28150106@gmail.com",
        pass: "0987574201"
    },
    tls: {
        rejectUnauthorized: false,
    }
})
module.exports  =  transporter