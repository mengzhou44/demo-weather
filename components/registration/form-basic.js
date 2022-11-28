import validator from 'email-validator';
import phone from 'phone';
import { useState } from 'react';
import styles from './form1.module.css'

export function FormBasic({ data, onNext }) {

  const [firstName, setFirstName] = useState(data.firstName ?? '');
  const [lastName, setLastName] = useState(data.lastName ?? '');

  const [gender, setGender] = useState(data.gender ?? 'M');
  const [birthDate, setBirthDate] = useState(data.birthDate ?? '');
  const [ethnicity, setEthnicity] = useState(data.ethnicity ?? 'Asian');

  const [email, setEmail] = useState(data.email ?? '');
  const [phoneNumber, setPhoneNumber] = useState(data.phone?.number ?? '');
  const [countryCode, setCountryCode] = useState(data.phone?.country ?? '');

  const [message, setMessage] = useState('');

  const validateInputs = () => {
    setMessage('');
    if (firstName === '') {
      setMessage('First name is required!');
      return false;
    } else if (lastName === '') {
      setMessage('Last name is required!');
      return false;
    } else if (gender === '') {
      setMessage('Gender is required!');
      return false;
    }
    else if (ethnicity === '') {
      setMessage('Ethnicity is required!');
      return false;
    }
    else if (birthDate === '') {
      setMessage('Birth Date is required!');
      return false;
    }
    else if (email === '') {
      setMessage('Email is required!');
      return false;
    } else if (email !== '' && !validator.validate(email)) {
      setMessage('Enter valid email address!');
      return false;
    } else if (phoneNumber === '') {
      setMessage('Phone number is required!');
      return false;
    } else if (countryCode === '') {
      setMessage('Country code is required!');
      return false;
    } else if (!countryCode.startsWith('+')) {
      setMessage('Country code is invalid!');
      return false;
    }
    else if (phone(`${countryCode}${phoneNumber}`).isValid === false) {
      setMessage('country code or phone number is invalid!');
      return false;
    }
    return true;
  };

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
        <label htmlFor="firstName">First name *</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameTextChange}
        ></input>
      </div>
      <div className={styles.field}>
        <label htmlFor="lastName">Last name *</label>
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
        <label htmlFor="birthDate">Birth Date *</label>
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
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailTextChange}
        ></input>
      </div>

      <div className={styles.field}>

        <label>Phone *</label>
        <div className={styles.phoneInput} >
          <input
            className={styles.countryCode}
            id="countryCode"
            type="text"
            value={countryCode}
            placeholder="+1"
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

      <p>{message}</p>
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
                phone: phoneNumber
              }
            })
          }
        }}>Next</button>
      </div>
    </div>
  </>
}