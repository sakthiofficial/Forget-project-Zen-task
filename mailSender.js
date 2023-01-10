import nodemailer, { createTransport } from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config()
export default async function sendMail(mailId, content) {

    let sender = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: "false",
        auth: {
            user: "sakthiroky123@gmail.com",
            pass: process.env.password
        }
    })

    let sendInfo = {
        "from": "sakthiroky123@gmail.com",
        "to": mailId,
        "subject": "testing",
        "text": content,
        // html: `<img scr=https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg}/>`
    };
    await sender.sendMail(sendInfo, (err, info) => {
        if (err) {
            console.log(err);

        } else {
            console.log(info);
            console.log(content);

        }
    })
}

