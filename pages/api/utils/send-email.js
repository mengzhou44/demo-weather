import nodemailer from "nodemailer";
 
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SYSTEM_EMAIL,
    pass: process.env.SYSTEM_EMAIL_PASSWORD
  }
});

const createHtml = ({lastName, firstName, email, phone,  message}) => {
    return `
      <div> 
        <h3>LastName:  ${lastName} </h3>
        <h3>FirstName: ${firstName} </h3>
        <h3>Email: ${email} </h3>
        <h3>Phone: ${phone} </h3>
        <p>
             ${message}
        </p>
      </div>    
     `;
  }

export const sendEMail = ({lastName, firstName, email, phone, message}) => {
    return new Promise((resolve, reject)=> {

        const mailOptions= {
            html:  createHtml({lastName, firstName, email, phone, message}),
            to: process.env.SYSTEM_EMAIL,
            subject: `${firstName} inqury`
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

 