import { useState } from 'react';
import styles from './form3.module.css'

export function Form3({data, onNext, onPrev}) {
 
    const [phone, setPhone] = useState(data.phone??'');
    const [userMessage, setUserMessage] = useState('');

    const validateInputs = () => {
        setUserMessage('');
    
        return true;
    };

    const handlePhoneTextChange = (e) => {
        setPhone(e.target.value);
    };
 
    return <>
       <div className={styles.inputs}>
          <div className={styles.field}>
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={handlePhoneTextChange}
            ></input>
          </div>
 
          <p>{userMessage}</p>

          <div className={styles.buttons}>
            <button onClick={()=> onPrev()}>Prev</button>
            <button onClick={()=> {
                 if (validateInputs()) {
                     onNext({phone})
                 }
            }}>Next</button>
          </div>    
        </div>
    </>
}