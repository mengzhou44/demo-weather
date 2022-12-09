import { createRegistration } from "./utils/db/registration";
import validator from 'email-validator';
import moment from 'moment';
import phoneValidate from 'phone';
import { sendEMail } from "./utils/send-register-email";

function isBirthDateValid(birthDate) {
  return moment(birthDate).isValid()
}

function calculateAge(birthDate){
  return  moment().diff(birthDate, 'years');
}

const Register=  async (req, res) => {
  if (req.method === 'POST') {
    try {
     
        const registration = req.body;
        const {
          address,
          birthDate,
          city,
          country,
          coursesRequest,
          currentGrade, 
          email, 
          ethnicity, 
          firstName, 
          gender,  
          lastName, 
          parentName, 
          parentEmail, 
          parentPhone, 
          parentSignature, 
          phone, 
          state, 
          studentSignature, 
          zipCode
        }
         = registration  

        if (!address) {
          res.send({ done: false, message: 'address is required.' });
        } else if (!birthDate) {
          res.send({ done: false, message: 'birthDate is required.' });
        } else if (!isBirthDateValid(birthDate)) {
          res.send({ done: false, message: 'birthDate is invalid.' });
        }
        else if (!city) {
          res.send({ done: false, message: 'city is required.' });
        }else if (!country) {
          res.send({ done: false, message: 'country is required.' });
        }else if (!currentGrade) {
          res.send({ done: false, message: 'current grade is required.' });
        }else if (!email) {
          res.send({ done: false, message: 'email is required.' });
        } else if (!validator.validate(email)) {
          res.send({ done: false, message: 'email is invalid.' });
        }
        else if (!ethnicity) {
          res.send({ done: false, message: 'ethnicity is required.' });
        }else if (!firstName) {
          res.send({ done: false, message: 'first name is required.' });
        }else if (!gender) {
          res.send({ done: false, message: 'gender is required.' });
        }else if (!lastName) {
          res.send({ done: false, message: 'last name is required.' });
        }
        else if (!parentName) {
          res.send({ done: false, message: 'parent name is required.' });
        }
        else if (!parentEmail) {
          res.send({ done: false, message: 'parent email is required.' });
        } else if (!validator.validate(parentEmail)) {
          res.send({ done: false, message: 'parent email is invalid.' });
        }
        else if (!parentPhone) {
          res.send({ done: false, message: 'parent phone is required.' });
        } 
        else if (!phoneValidate(parentPhone).isValid ) {
          res.send({ done: false, message: 'parent phone is invalid.' });
        }
        else if (calculateAge(birthDate)<18 && !parentSignature) {
          res.send({ done: false, message: 'parent signature is required!' });
        }
        else if (!phone) {
          res.send({ done: false, message: 'phone is required.' });
        } 
        else if (!phoneValidate(phone).isValid ) {
          res.send({ done: false, message: 'parent phone is invalid.' });
        } 
        else if (!state) {
          res.send({ done: false, message: 'state is required.' });
        } 
        else if (!studentSignature) {
          res.send({ done: false, message: 'student signature is required.' });
        } 
        else if (!zipCode) {
          res.send({ done: false, message: 'zip code is required.' });
        } 
         else {
          
          registration.birthDate=moment(birthDate)
          await createRegistration(registration);
          await sendEMail(registration)
          res.send({ done: true});
        }
     
    } catch (err) {
      console.log(`Something went wrong while creating registration. ${err}`);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
};

export default Register;
