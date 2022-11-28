import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/layout';
import { useState } from 'react'
import validator from 'email-validator'
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {

  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function clearInputs() {
    setLastName('')
    setFirstName('')
    setEmail('');
    setPhone('')
    setMessage('')
  }

  function renderLoading() {
    return <div className={styles['form-content']}>
     <p className={styles.loading}>  
         Please Wait ...
    </p>
    </div>
  }
  function renderFormContent() {
    return <div className={styles['form-content']}>
      <div className={styles.field} >
        <input placeholder='Last name' type='text' value={lastName}
          onChange={e => {
            setLastName(e.target.value)
          }}></input>
      </div>
      <div className={styles.field} >
        <input placeholder='First name' type='text' value={firstName}
          onChange={e => {
            setFirstName(e.target.value)
          }}
        >
        </input>
      </div>
      <div className={styles.field} >
        <input placeholder='Phone' type='text' value={phone}
          onChange={e => {
            setPhone(e.target.value)
          }}
        ></input>
      </div>

      <div className={styles.field} >
        <input placeholder='Email' type='text' value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        ></input>
      </div>
      <div className={styles.field} >
        <textarea placeholder='I would like to know' type='text' value={message} rows="5" cols="45"
          onChange={e => {
            setMessage(e.target.value)
          }}
        ></textarea>
      </div>
 
      <div className={styles.field} >
        <button className={styles.submit} onClick={
          async () => {
            if (lastName === '') {
              toast.warn('Last name is required.')
            }
            else if (firstName === '') {
              toast.warn('First name is required.')
            }
            else if (phone === '') {
              toast.warn('Phone is required.')
            }
            else if (email === '') {
              toast.warn('Email is required.')
            }
            else if (!validator.validate(email)) {
              toast.warn('Email is invalid.')
            }
            else if (message === '') {
              toast.warn('Please tell us what you want to know')
            } else {
              setLoading(true)

              let res = await fetch('/api/send-message', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lastName, firstName, email, phone, message }),
              });

              res = await res.json();
              setLoading(false)
              if (res.done) {
                clearInputs()
                toast.success('We received your message. Thank You!')
              } else {
                toast.error('Sorry, error occured. Message was not sent!')
              }
            }
          }
        }>Submit</button>
      </div>
    </div>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
        <section id="home" className={styles.hero}>
          <div className={styles.mission} >
            <h3>ACHIEVE YOUR COLLEGE DREAM WITH AGOURA HILLS ACADEMY</h3>
          </div>
          <div className={styles['form-container']}>
            <div className={styles.form}>
              <div className={styles.contact}>
                <h4>Contact Us</h4>
              </div>
              {loading && renderLoading()}
              {!loading && renderFormContent()}
              <ToastContainer  />
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

