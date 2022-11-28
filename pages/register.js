import Head from 'next/head';
import { useState } from 'react';
import { FormBasic } from '../components/register/form-basic'
import { FormAddress } from '../components/register/form-address'
import { FormCourse } from '../components/register/form-course'
import { FormSignature } from '../components/register/form-signature'

import styles from './register.module.css';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../components/layout';
import phone from 'phone';

const Register = () => {
  const [registration, setRegistration] = useState({})
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let temp = {...registration}
      temp.phone = `${temp.phone.country}${temp.phone.number}`
      temp.parentPhone = `${temp.parentPhone.country}${temp.parentPhone.number}`

      let res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
      });

      res = await res.json();
      setLoading(false)
      if (res.done) {
        toast.success('Thank You, your registration is complete.')
      } else {
        toast.error('Sorry, error occured, your registration failed.')
      }
    } catch (err) {
      setLoading(false);
    }
  };

  function renderForm() {
    if (step === 1) {
      return <FormBasic
        data={registration}
        onNext={(data) => {
          setRegistration(Object.assign(registration, data))
          setStep(step + 1)
        }}></FormBasic>
    }
    else if (step === 2) {
      return <FormAddress
        data={registration}
        onNext={data => {
          setRegistration(Object.assign(registration, data))
          setStep(step + 1)
        }
        }
        onPrev={() => setStep(step - 1)}>
      </FormAddress>
    } else if (step === 3) {
      return <FormCourse
        data={registration}
        onNext={data => {
          setRegistration(Object.assign(registration, data))
          setStep(step + 1)
        }
        } onPrev={() => setStep(step - 1)}>

      </FormCourse>
    } else if (step === 4) {
      return <FormSignature
        data={registration}
        onSubmit={data => {
          setRegistration(Object.assign(registration, data))
          handleRegister()
        }
        } onPrev={() => setStep(step - 1)}>

      </FormSignature>
    }

  }
  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register" />
      </Head>
      <Layout>
        <div className={styles.page}>
          <div className="title">
            <h2>
              Register
            </h2>
            <div className={styles.container}>
              {loading && renderLoading()}
              {!loading && renderForm()}
              <ToastContainer />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Register;


