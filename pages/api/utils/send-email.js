import nodemailer from "nodemailer";
import { resolve } from "styled-jsx/css";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SYSTEM_EMAIL,
    pass: process.env.SYSTEM_EMAIL_PASSWORD
  }
});

const createHtml = ({name, email, message}) => {
    return `
      <div> 
        <h3>Name:  ${name} </h3>
        <h3>Email: ${email} </h3>
        <p>
             ${message}
        </p>
      </div>    
     `;
  }

export const sendEMail = ({name,email, message}) => {
    return new Promise((resolve, reject)=> {

        const mailOptions= {
            html:  createHtml({name, email, message}),
            to: process.env.SYSTEM_EMAIL,
            subject: `${name} inqury`
        }
         
        transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                reject(new Error(error));
            } else {
                resolve()
            } 
        });

    })
};

 