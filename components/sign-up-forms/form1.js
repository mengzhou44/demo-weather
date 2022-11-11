import validator from 'email-validator';
import phone from 'phone';
import { useState } from 'react';
import styles from './form1.module.css'

export function Form1({data,onNext}) {
 
    const [email, setEmail] = useState(data.email??'');
    const [phoneNumber, setPhoneNumber] = useState(data.phone?.number??'');
    const [countryCode, setCountryCode] = useState(data.phone?.country??'');
 
    const [firstName, setFirstName] = useState(data.firstName??'');
    const [lastName, setLastName] = useState(data.lastName ??'');
    const [userMessage, setUserMessage] = useState('');
    
    const validateInputs = () => {
        setUserMessage('');
        if (email === '') {
        setUserMessage('Email is required!');
        return false;
        } else if (email !== '' && !validator.validate(email)) {
        setUserMessage('Enter valid email address!');
        return false;
        } else if (firstName === '') {
        setUserMessage('First name is required!');
        return false;
        } else if (lastName === '') {
        setUserMessage('Last name is required!');
        return false;
        } else if (phoneNumber === '') {
            setUserMessage('Phone number is required!');
            return false;
        }
        else if (countryCode === '') {
            setUserMessage('Country code is required!');
            return false;
        } else if (!countryCode.startsWith('+')) {
            setUserMessage('Country code is invalid!');
            return false;
        }  
        else if (phone(`${countryCode}${phoneNumber}`).isValid === false) {
            setUserMessage('country code or phone number is invalid!');
            return false;  
        }

        return true;
    };

    const handleEmailTextChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFirstNameTextChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameTextChange = (e) => {
        setLastName(e.target.value);
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
                        className={ styles.countryCode}
                        id="countryCode"
                        type="text"
                        value={countryCode}
                        placeholder="+1"
                        onChange={handleCountryCodeTextChange}
                        ></input>
                
                    <input
                        id="phoneNumber"
                        className={ styles.phoneNumber}
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumberTextChange}
                        ></input>
                
                </div>
          </div>
          
          <p>{userMessage}</p>
          <div className={styles.buttons}>
            <button onClick={()=> {
                 if (validateInputs()) {
                     onNext({email, firstName, lastName, countryCode, phoneNumber})
                 }
            }}>Next</button>
          </div>    
        </div>
    </>
}