import Head from 'next/head';
import { useState } from 'react';
import  FormBasic  from '../components/register/form-basic'
import  FormAddress  from '../components/register/form-address'
import  FormCourse  from '../components/register/form-course'
import  FormSignature  from '../components/register/form-signature'
import { categorize } from '../utils/categorize-courses';
import { useRouter } from 'next/router'

import styles from './register.module.css';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../components/layout';

const Register = ({categorized}) => {
  const [registration, setRegistration] = useState({})
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    try {
      setLoading(true);
      let temp = { ...registration }
      
      temp.phone = `${temp.phone.country}${temp.phone.number}`
      temp.parentPhone = `${temp.parentPhone.country}${temp.parentPhone.number}`
      temp.coursesRequest = registration.coursesRequest.join(',');

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
        toast.success('Your registration is submitted. Someone from our admission team will contact you shortly.', {
            onClose: ()=> {
               setTimeout(()=> {
                router.push('/')
               }, 3000)
            }
        })
      } else {
        toast.error('Sorry, error occured, your registration failed.')
      }
    } catch (err) {
      setLoading(false);
    } finally {
       setRegistration({})
    }
  };

  function renderLoading() {
      return <div className={styles.loading}>Please wait...</div>
  }

  function renderForm() {
    if (step === 1) {
      return <FormBasic
        data={registration}
        onNext={(data) => {
          console.log('step1')
          setRegistration(Object.assign(registration, data))
          setStep(step + 1)
        }} />
    }
    else if (step === 2) {
      return <FormAddress
        data={registration}
        onNext={data => {
          setRegistration(Object.assign(registration, data))
          setStep(step + 1)
        }}
        onPrev={() => setStep(step - 1)}
        />
    } else if (step === 3) {
      return <FormCourse
        categorized={categorized}
        data={registration}
        onNext={data => {
          setRegistration(Object.assign(registration, data))
          setStep(step + 1)
        }}
        onPrev={() => setStep(step - 1)}
      />

    } else if (step === 4) {
      return <FormSignature
        data={registration}
        onSubmit={data => {
          setRegistration(Object.assign(registration, data))
          handleRegister()
        }}
        onPrev={() => setStep(step - 1)} />
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
              <div className={styles.form}>
                {loading && renderLoading()}
                {!loading && renderForm()}
              </div>
              <ToastContainer  />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Register;





export async function getStaticProps() {

  const res = await fetch(`${process.env.BASE_URL}/courses`);
  const categorized = categorize(await res.json());
  return {
    props: {
       categorized
    },
  }
}
 

