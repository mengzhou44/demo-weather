import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/layout';
import {useState} from 'react'
import validator from 'email-validator'
export default function Home() {

  const [ lastName, setLastName] = useState('')
  const [ firstName, setFirstName] = useState('')
  const [ email, setEmail] = useState('')
  const [ phone, setPhone] = useState('')
  const [ message, setMessage] = useState('')
  const [ warning, setWarning] = useState('')

  function clearInputs() {
    setLastName('')
    setFirstName('')
    setEmail('');
    setPhone('')
    setMessage('')
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
              <div className={styles.field} >
                  <h4>Contact Us</h4>
              </div> 
              <div className={styles.field} >
                  <input placeholder='Last name' type='text' value={lastName}
                    onChange={e=> {
                     setLastName(e.target.value)
                     setWarning('')
                  }}></input>
              </div>
              <div className={styles.field} >
                  <input placeholder='First name' type='text' value={firstName}
                   onChange={e=> {
                    setFirstName(e.target.value)
                    setWarning('')
                   }}
                  >
                  </input>
              </div>
              <div className={styles.field} >
                  <input placeholder='Phone' type='text' value={phone}
                     onChange={e=> {
                      setPhone(e.target.value)
                      setWarning('')
                     }}
                  ></input>
              </div>

              <div className={styles.field} >
                  <input placeholder='Email' type='text' value={email}
                     onChange={e=> {
                      setEmail(e.target.value)
                      setWarning('')
                     }}
                  ></input>
              </div>
              <div className={styles.field} >
                  <textarea placeholder='I would like to know' type='text' value={message} rows ="5" cols = "45"
                    onChange={e=> {
                      setMessage(e.target.value)
                      setWarning('')
                     }}
                  ></textarea>
              </div>
              {warning && 
                     <div className={styles.field} >
                          <p className={styles.warning}>
                             {warning}
                          </p>
                      </div>
              }
              <div className={styles.field} >
                  <button className={styles.submit} onClick={
                      ()=> {
                           if (lastName === '') {
                             setWarning('Last name is required.')
                           }   
                           else if (firstName === '') {
                            setWarning('First name is required.')
                           }   
                           else if (phone === '') {
                            setWarning('Phone is required.')
                           } 
                           else if (email === '') {
                            setWarning('Email is required.')
                           }  
                           else if (!validator.validate(email)) {
                             setWarning('Email is invalid.')
                           }              
                           else if (message === '') {
                             setWarning('Please tell us what you want to know')
                           }                              
                      }
                  }>Submit</button>
              </div>
           </div>
           </div>
      </section>
      </Layout>
    </div>
  );
}

