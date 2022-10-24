import styles from './footer.module.css';
import {useState} from 'react';
import validator from 'validator'; 
const Footer = () => {

  const [showMessageForm, setShowMessageForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage]= useState('')
  const [errorMessage, setErrorMessage]= useState('')

  function sendMessage() {
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
         setShowMessageForm(false)
         console.log({name, email, message})
      }
  }

  return (
    <footer className={`${styles.footer}`}>
      <div className={styles.content}>
          <div className={styles.section}>
            <h4>Los Angeles</h4>    
            <p> 909 - 11 Avenue SW </p>
            <p> Calgary, AB  </p>
            <p> T2R 1L8 </p>
          </div>

          <div className={styles.section}>
            <h4> 1-888-511-7550</h4>    
            <p>info@agourahills.com</p>
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
        copyright &copy; Agoura Hills Academy
        <span>{new Date().getFullYear()}</span>. all rights reserved
      </p>
      { showMessageForm &&
         <div className={styles.messageFormWrapper}>
         <div className={styles.messageForm} >
               <div className={styles.formTitle}>Send Us Message</div>
               <input type='text' placeholder ='Name' value={name} onChange={(e)=> setName(e.target.value)}></input>
               <input type='text' placeholder ='Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
              <textarea placeholder='Message' value={message} rows={4} onChange={e=> setMessage(e.target.value)} />
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
              <div className={styles.buttons}>
                <button onClick={()=> sendMessage()}>Send</button> 
                <button onClick={()=>  {
                  setShowMessageForm(false)
                  setEmail('');
                  setMessage('')
                  setName('')
                  setErrorMessage('')
                }}
                >Cancel</button>
              </div>
              </div>             
         </div>
      }
   
    </footer>
  );
};

export default Footer;
