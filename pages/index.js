import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/layout';
import {useState} from 'react'
export default function Home() {

  const [ lastName, setLastName] = useState('')
  const [ firstName, setFirstName] = useState('')
  const [ email, setEmail] = useState('')
  const [ phone, setPhone] = useState('')
  const [ message, setMessage] = useState('')

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
                  <input placeholder='Last name' type='text' value={lastName}></input>
              </div>
              <div className={styles.field} >
                  <input placeholder='First name' type='text' value={firstName}></input>
              </div>
              <div className={styles.field} >
                  <input placeholder='Phone' type='text' value={phone}></input>
              </div>

              <div className={styles.field} >
                  <input placeholder='Email' type='text' value={email}></input>
              </div>
              <div className={styles.field} >
                  <textarea placeholder='I would like to know' type='text' value={message} rows ="5" cols = "45"></textarea>
              </div>
              <div className={styles.field} >
                  <button className={styles.submit}>Submit</button>
              </div>
           </div>
           </div>
      </section>
      </Layout>
    </div>
  );
}

