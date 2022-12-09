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


    <style>
         .section {
            margin-bottom: 40px;
            background-color:  #e9e9e9;
            padding: 20px;
            border-radius: 3px;  
         }

         .section h3 {
             margin-bottom: 5px;
         }

         .section h4 {
            font-weight: 400;
         }
    </style>
</head>
<body>
    <div>
        <div class="section"> 
            <h3>Personal Info </h3> 
            <h4>First Name: ${firstName} </h4>
            <h4>Last Name: ${lastName} </h4>
            <h4>Email: ${email} </h4>
            <h4>Phone: ${phone} </h4>
            <h4>Birth Date: ${birthDate} </h4>
            <h4>Ethnicity: ${ethnicity} </h4>
            <h4>Gender: ${gender} </h4>
        </div> 
        
        <div class="section"> 
                <h3>Address </h3> 
                <h4>${address}</h4>
                <h4>${city} ${state} ${zipCode} ${country}</h4>             
        </div> 

        <div class="section"> 
                <h3>Courses Requested </h3> 
                <h4>Current Grade: ${currentGrade} </h4>
                <h4>${coursesRequest}</h4>             
        </div> 

        <div class="section"> 
                <h3>Signatures </h3> 
                <h4>Parent Name: ${parentName} </h4>
                <h4>Parent Email: ${parentEmail} </h4>
                <h4>Parent Phone: ${parentPhone} </h4>
                <h4>Parent Signature: ${parentSignature} </h4>
                <h4>Student Signature: ${studentSignature} </h4>
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

