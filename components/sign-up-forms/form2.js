import { useState } from 'react';
import styles from './form2.module.css'
import validator from 'validator'

export function Form2({ data, onNext, onPrev}) {
 
    const [gender, setGender] = useState(data.gender??'M');
    const [birthDate, setBirthDate] = useState(data.birthDate??'');
    const [ethnicity, setEthnicity ] =  useState(data.ethnicity??'Asian');
    const [country, setCountry ] =  useState(data.country??'');

    const [userMessage, setUserMessage] = useState('');
    
    const validateInputs = () => {
        setUserMessage('');

        if (!validator.isDate(birthDate)) {
            setUserMessage('Birth date is invalid!')
            return false
        }

        else if (country === '') {
            setUserMessage('Country is required!')
            return false
        }
        else if (country.length <3) {
            setUserMessage('Country is invalid')
            return false
        }

        return true;
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

    const handleCountryTextChange = (e) => {
        setCountry(e.target.value);
    };

    return <>
       <div className={styles.inputs}>
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
            <label htmlFor="country">Country *</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={handleCountryTextChange}
            ></input>
          </div>

          <p>{userMessage}</p>

          <div className={styles.buttons}>
            <button onClick={()=> onPrev()}>Prev</button>
            <button onClick={()=> {
                 if (validateInputs()) {
                     onNext({gender, birthDate, ethnicity, country})
                 }
            }}>Next</button>
          </div>    
        </div>
    </>
}