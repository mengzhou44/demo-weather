import styles from './footer.module.css';
import {useState} from 'react'
import { StyleRegistry } from 'styled-jsx';
const Footer = () => {

  const [showMessageForm, setShowMessageForm] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage]= useState('')
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
         <div className={styles.messageForm} >
               <input type='text' placeholder ='Name' value={name}></input>
               <input type='text' placeholder ='Email' value={email}></input>
              <textarea placeholder='Message' value={message} rows={4} />
              <div className={styles.buttons}>
                <button>Send</button> 
                <button>Cancel</button>
              </div>
             
         </div>
      }
   
    </footer>
  );
};

export default Footer;
