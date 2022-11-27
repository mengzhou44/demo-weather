import styles from './footer.module.css';
const Footer = () => {
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
           
          </div>
      </div>
     
      <p className={styles.copyright}>
        Copyright &copy; Agoura Hills Academy &nbsp;
        <span>{new Date().getFullYear()}</span>. All rights reserved
      </p>
    
    </footer>
  );
};

export default Footer;
