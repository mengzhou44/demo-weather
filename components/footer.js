import styles from './footer.module.css';
const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>     
      <p className={styles.copyright}>
        Copyright &copy; Agoura Hills Academy&nbsp;
        <span>{new Date().getFullYear()}</span>. All rights reserved.
      </p>
    
    </footer>
  );
};

export default Footer;
