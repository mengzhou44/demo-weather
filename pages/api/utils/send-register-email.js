import { transporter } from "./transporter";

const createHtml = ({
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    ethnicity,
    gender,

    address,
    city,
    state,
    zipCode,
    country,

    coursesRequest,
    currentGrade,

    parentName,
    parentEmail,
    parentPhone,
    parentSignature,
    studentSignature,

}) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Complete</title>
    <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>

</head>
<body>
    <div>
        <div  style="margin-bottom: 40px; background-color: #e9e9e9; padding: 20px; border-radius: 3px">
            <h3>Personal Info </h3> 
            <p>First Name: ${firstName} </p>
            <p>Last Name: ${lastName} </p>
            <p>Email: ${email} </p>
            <p>Phone: ${phone} </p>
            <p>Birth Date: ${birthDate} </p>
            <p>Ethnicity: ${ethnicity} </p>
            <p>Gender: ${gender} </p>
        </div> 
        
        <div  style="margin-bottom: 40px; background-color: #e9e9e9; padding: 20px; border-radius: 3px">
                <h3>Address </h3> 
                <p>${address}</p>
                <p>${city} ${state} ${zipCode} ${country}</p>             
        </div> 

        <div  style="margin-bottom: 40px; background-color: #e9e9e9; padding: 20px; border-radius: 3px">
                <h3>Courses Requested </h3> 
                <p>Current Grade: ${currentGrade} </p>
                <p>${coursesRequest}</p>             
        </div> 

        <div  style="margin-bottom: 40px; background-color: #e9e9e9; padding: 20px; border-radius: 3px">
                <h3>Signatures </h3> 
                <p>Parent Name: ${parentName} </p>
                <p>Parent Email: ${parentEmail} </p>
                <p>Parent Phone: ${parentPhone} </p>
                <p>Parent Signature: ${parentSignature} </p>
                <p>Student Signature: ${studentSignature} </p>
        </div> 
      </div>
</body>
</html>
     `;
}



export const sendEMail = (registration) => {
    return new Promise((resolve, reject) => {
        const { lastName, firstName } = registration
        const mailOptions = {
            html: createHtml(registration),
            to: process.env.ADMIN_EMAIL,
            subject: `${lastName}, ${firstName} registration`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(new Error(error));
            } else {
                resolve()
            }
        });
    })
};

