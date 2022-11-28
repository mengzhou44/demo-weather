import validator from 'email-validator';
import moment from 'moment';
import phone from 'phone';
import { useState } from 'react';
import styles from './form.module.css'
import { toast, ToastContainer } from 'react-toastify'

function FormBasic({ data, onNext }) {

  const [firstName, setFirstName] = useState(data.firstName ?? '');
  const [lastName, setLastName] = useState(data.lastName ?? '');

  const [gender, setGender] = useState(data.gender ?? 'M');
  const [birthDate, setBirthDate] = useState(data.birthDate ?? '');
  const [ethnicity, setEthnicity] = useState(data.ethnicity ?? 'Asian');

  const [email, setEmail] = useState(data.email ?? '');
  const [phoneNumber, setPhoneNumber] = useState(data.phone?.number ?? '');
  const [countryCode, setCountryCode] = useState(data.phone?.country ?? '+1');

  const validateInputs = () => {
    if (firstName === '') {
      toast.error('First name is required!');
      return false;
    } else if (lastName === '') {
      toast.error('Last name is required!');
      return false;
    } else if (gender === '') {
      toast.error('Gender is required!');
      return false;
    }
    else if (ethnicity === '') {
      toast.error('Ethnicity is required!');
      return false;
    }
    else if (birthDate === '') {
      toast.error('Birth Date is required!');
      return false;
    } else if (!isBirthDateValid(birthDate)) {
      toast.error('Birth Date is not valid!');
      return false;
    }
    else if (email === '') {
      toast.error('Email is required!');
      return false;
    } else if (email !== '' && !validator.validate(email)) {
      toast.error('Enter valid email address!');
      return false;
    } else if (phoneNumber === '') {
      toast.error('Phone number is required!');
      return false;
    } else if (countryCode === '') {
      toast.error('Country code is required!');
      return false;
    } else if (!countryCode.startsWith('+')) {
      toast.error('Country code  should starts with +');
      return false;
    }
    else if (phone(`${countryCode}${phoneNumber}`).isValid === false) {
      toast.error('country code or phone number is invalid!');
      return false;
    }
    return true;
  };
 
  function isBirthDateValid(birthDate) {
      return moment(birthDate).isValid()
  }

  const handleFirstNameTextChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameTextChange = (e) => {
    setLastName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEthnicityChange = (e) => {
    setEthnicity(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleEmailTextChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCountryCodeTextChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberTextChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return <>
    <div className={styles.inputs}>
      <div className={styles.field}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameTextChange}
        ></input>
      </div>
      <div className={styles.field}>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameTextChange}
        ></input>
      </div>
      <div className={styles.field}>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={handleGenderChange}
        >
          <option value='M'>Male</option>
          <option value='F'>Female</option>
          <option value=''>Rather Not Say</option>
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="birthDate">Birth Date</label>
        <input
          id="birthDate"
          type="text"
          value={birthDate}
          placeholder='yyyy-mm-dd'
          onChange={handleBirthDateChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="ethnicity">Ethnicity</label>
        <select
          id="ethnicity"
          value={ethnicity}
          onChange={handleEthnicityChange}
        >
          <option value='Native'>American Indian</option>
          <option value='Black'>African American</option>
          <option value='Asian'>Asian</option>
          <option value='Hispanic'>Spanish Origin</option>
          <option value='Pacific Islander'>Pacific Islander</option>
          <option value='White'>White</option>
          <option value=''>Rather Not Say</option>
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailTextChange}
        ></input>
      </div>

      <div className={styles.field}>

        <label>Phone</label>
        <div className={styles.phoneInput} >
          <input
            className={styles.countryCode}
            id="countryCode"
            type="text"
            value={countryCode}
            onChange={handleCountryCodeTextChange}
          ></input>

          <input
            id="phoneNumber"
            className={styles.phoneNumber}
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberTextChange}
          ></input>

        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={() => {
          if (validateInputs()) {
            onNext({
              firstName,
              lastName,
              gender, 
              ethnicity,
              birthDate,
              email,
              phone: {
                country: countryCode,
                number: phoneNumber
              }
            })
          }
        }}>Next</button>
      </div>
      <ToastContainer />
    </div>
  </>
}

export default FormBasic