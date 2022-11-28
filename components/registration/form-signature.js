import { useState } from 'react';
import phone from 'phone';
import { validate } from 'email-validator'
import styles from './form-signature.module.css'

function FormSignature({ data, onSubmit, onPrev }) {

    const [parentName, setParentName] = useState(data.parentName ?? '');
    const [parentEmail, setParentEmail] = useState(data.parenEmail ?? '');
    const [parentPhoneNumber, setParentPhoneNumber] = useState(data.parent.phone.number ?? '');
    const [parentPhoneCountryCode, setParentPhoneCountryCode] = useState(data.parent.phone.country ?? '');
    const [parentSignature, setParentSignature] = useState(data.parentSignature ?? '');
    const [studentSignature, setStudentSignature] = useState(data.studentSignature ?? '');

    const [message, setMessage] = useState('');
    const age = data.age;

    const validateInputs = () => {
        if (!parentName) {
            setMessage('Parent Name is required!')
            return false
        }
        else if (!parentEmail) {
            setMessage('Parent email is required!')
            return false
        } else if (!validate(email)) {
            setMessage('Parent email is invalid!')
            return false
        }
        else if (!parentPhoneCountryCode) {
            setMessage('Parent phone country code is required!')
            return false
        }
        else if (!parentPhoneNumber) {
            setMessage('Parent phone number is required!')
            return false
        }
        else if (phone(`${countryCode}${phoneNumber}`).isValid === false) {
            setMessage('country code or phone number is invalid!');
            return false;
        }
        else if (age<18 && !parentSignature) {
            setMessage('Parent signature is required');
            return false;
        }
        else if (!studentSignature) {
            setMessage('Student signature is required');
            return false;
        }

        setMessage('');
        return true;
    };

    const handleParentNameTextChange = (e) => {
        setParentName(e.target.value);
    };

    const handleParentEmailTextChange = (e) => {
        setParentEmail(e.target.value);
    };

    const handleParentPhoneCountryCodeTextChange = (e) => {
        setParentPhoneCountryCode(e.target.value);
    };

    const handleParentPhoneNumberTextChange = (e) => {
        setParentPhoneNumber(e.target.value);
    };

    const handleParentSignatureTextChange = (e) => {
        setParentSignature(e.target.value);
    };

    const handleStudentSignatureTextChange = (e) => {
        setStudentSignature(e.target.value);
    };

    return <>
        <div className={styles.inputs}>
            <div className={styles.field}>
                <label htmlFor="parentName">Parent Name*</label>
                <input
                    id="parentName"
                    type="text"
                    value={parentName}
                    onChange={handleParentNameTextChange}
                ></input>
            </div>

            <div className={styles.field}>
                <label htmlFor="parentEmail">Parent Email*</label>
                <input
                    id="parentEmail"
                    type="text"
                    value={parentEmail}
                    onChange={handleParentEmailTextChange}
                ></input>
            </div>

            <div className={styles.field}>

                <label>Phone *</label>
                <div className={styles.phoneInput} >
                    <input
                        className={styles.countryCode}
                        id="countryCode"
                        type="text"
                        value={parentPhoneCountryCode}
                        placeholder="+1"
                        onChange={handleParentPhoneCountryCodeTextChange}
                    ></input>

                    <input
                        id="phoneNumber"
                        className={styles.phoneNumber}
                        type="text"
                        value={parentPhoneNumber}
                        onChange={handleParentPhoneNumberTextChange}
                    ></input>

                </div>
            </div>

            {age < 18 &&
                <div className={styles.field}>
                    <p>
                        Enrollment Agreement: If the applicant is under 18-years of age, printing parent/guardian full name in this box constitutes electronic signature.
                    </p>

                    <label htmlFor="parentSignature">Parent Signature*</label>
                    <input
                        id="parentSignature"
                        type="text"
                        value={parentSignature}
                        onChange={handleParentSignatureTextChange}
                    ></input>
                </div>
            }

            <div className={styles.field}>
                <label htmlFor="studnetSignature">Your Signature*</label>
                <input
                    id="studentSignature"
                    type="text"
                    value={studentSignature}
                    onChange={handleStudentSignatureTextChange}
                ></input>
            </div>
            <p>{message}</p>

            <div className={styles.buttons}>
                <button onClick={() => onPrev()}>Prev</button>
                <button onClick={() => {
                    if (validateInputs()) {
                        onSubmit({
                             parentName, 
                             parentEmail, 
                             parentPhone: {
                                country: parentPhoneCountryCode,
                                number: parentPhoneNumber
                             },
                             parentSignature,
                             studentSignature
                        })
                    }
                }}>Submit</button>
            </div>
        </div>
    </>
}

export default FormSignature