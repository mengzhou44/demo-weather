import { useState } from 'react';
import phone from 'phone';
import moment from 'moment'
import { validate } from 'email-validator'
import styles from './form.module.css'
import {toast, ToastContainer} from 'react-toastify'

function FormSignature({ data, onSubmit, onPrev }) {

    const [parentName, setParentName] = useState(data.parentName ?? '');
    const [parentEmail, setParentEmail] = useState(data.parenEmail ?? '');
    const [parentPhoneNumber, setParentPhoneNumber] = useState(data.parentPhone?.number ?? '');
    const [parentPhoneCountryCode, setParentPhoneCountryCode] = useState(data.parentPhone?.country ?? '');
    const [parentSignature, setParentSignature] = useState(data.parentSignature ?? '');
    const [studentSignature, setStudentSignature] = useState(data.studentSignature ?? '');

    const age = calculateAge(data.birthDate)

    function calculateAge(birthDate){
       return  moment().diff(birthDate, 'years');
    }
    const validateInputs = () => {
        if (!parentName) {
            toast.error('Parent Name is required!')
            return false
        }
        else if (!parentEmail) {
            toast.error('Parent email is required!')
            return false
        } else if (!validate(email)) {
            toast.error('Parent email is invalid!')
            return false
        }
        else if (!parentPhoneCountryCode) {
            toast.error('Parent phone country code is required!')
            return false
        }
        else if (!parentPhoneNumber) {
            toast.error('Parent phone number is required!')
            return false
        }
        else if (phone(`${parentPhoneCountryCode}${parentPhoneNumber}`).isValid === false) {
            toast.error('country code or phone number is invalid!');
            return false;
        }
        else if (age<18 && !parentSignature) {
            toast.error('Parent signature is required');
            return false;
        }
        else if (!studentSignature) {
            toast.error('Student signature is required');
            return false;
        }

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
                <label htmlFor="parentName">Parent Name</label>
                <input
                    id="parentName"
                    type="text"
                    value={parentName}
                    onChange={handleParentNameTextChange}
                ></input>
            </div>

            <div className={styles.field}>
                <label htmlFor="parentEmail">Parent Email</label>
                <input
                    id="parentEmail"
                    type="text"
                    value={parentEmail}
                    onChange={handleParentEmailTextChange}
                ></input>
            </div>

            <div className={styles.field}>

                <label>Parent Phone</label>
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

                    <label htmlFor="parentSignature">Parent Signature</label>
                    <input
                        id="parentSignature"
                        type="text"
                        value={parentSignature}
                        onChange={handleParentSignatureTextChange}
                    ></input>
                </div>
            }

            <div className={styles.field}>
                <label htmlFor="studnetSignature">Your Signature</label>
                <input
                    id="studentSignature"
                    type="text"
                    value={studentSignature}
                    onChange={handleStudentSignatureTextChange}
                ></input>
            </div>
        
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
            <ToastContainer />
        </div>
    </>
}

export default FormSignature