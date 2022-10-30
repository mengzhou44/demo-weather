import styles from './footer.module.css';
import {useState} from 'react';
import validator from 'validator'; 
import { motion } from 'framer-motion';
const Footer = () => {

  const [showMessageForm, setShowMessageForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage]= useState('')
  const [errorMessage, setErrorMessage]= useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
      setErrorMessage('')
      if (name=== '') {
          setErrorMessage('Name is required!')
      } else  if ( email === '') {
        setErrorMessage('Email is required!')
      } else  if ( message  === '') {
        setErrorMessage('Message is required!')
      }  else if ( !validator.isEmail(email)) {
         setErrorMessage('Email is invalid!')
      } else {
          setLoading(true)
          let  res= await fetch('/api/send-message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, message}),
          });
          console.log('step1')
          res = await res.json();
          console.log('step2')
          setLoading(false)
          if (res.done) {
              clearInputs()
              setSuccessMessage('We received your message. Thank You!')
          } else {
             setErrorMessage('Sorry, error occured. Message was not sent!')
          }
      }
  }

  function clearInputs() {
    setEmail('');
    setMessage('')
    setName('')
    setErrorMessage('')
  }

  function renderSuccessMessage() {
     if (successMessage) {
       return <div className={styles.success}>
           <h4>
           {successMessage}
            </h4> 
            <button onClick={()=>  {
              setSuccessMessage('')
              setShowMessageForm(false)
            }}> Ok</button>
         </div>
     } 
  }

  function renderFormContent() {
      if (loading === true)  {
           return <h4 className={styles.loading}>Please wait... </h4>
      }

      if (!successMessage) {
         return <>
           <input type='text' placeholder ='Name' value={name} onChange={(e)=> setName(e.target.value)}></input>
           <input type='text' placeholder ='Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
            <textarea placeholder='Message' value={message} rows={4} onChange={e=> setMessage(e.target.value)} />
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
             <div className={styles.buttons}>
                 <button onClick={()=> sendMessage()}>Send</button> 
                 <button onClick={()=>  {
                      setShowMessageForm(false)
                      clearInputs()
                    }}
                  >Cancel</button>
            </div>
         </>
      }
  }

  return (
    <footer className={`${styles.footer}`}>
      <div className={styles.content}>
          <div className={styles.section}>
            <p>Los Angeles</p>    
            <p> 909 - 11 Avenue SW </p>
            <p> Calgary, AB  </p>
            <p> T2R 1L8 </p>
          </div>

          <div className={styles.section}>
            <p>626-466-8899</p>    
            <p>zhu@agourahillsacademy.org</p>
            <a
              onClick={(e) => {
                setShowMessageForm(true)
            }}
          >
              Send Message
          </a>
          </div>
      </div>
     
      <p className={styles.copyright}>
        Copyright &copy; Agoura Hills Academy &nbsp;
        <span>{new Date().getFullYear()}</span>. All rights reserved
      </p>
      { showMessageForm &&
         <motion.div 
           className={styles.messageFormWrapper}
           initial="pageInitial"
           animate="pageAnimate"
           variants={{
              pageInitial: {
                opacity: 0,
              },
              pageAnimate: {
                opacity: 1,
              },
            }}
          >
      
          <div  className={styles.messageForm}>
               <div className={styles.formTitle}><h4>Send Us Message</h4></div>
                  { renderSuccessMessage()} 
                  { renderFormContent()}
            </div>          
         </motion.div>
      }
   
    </footer>
  );
};

export default Footer;
