import styles from './footer.module.css';
const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <p>
        copyright &copy; Agoura Hills Academy
        <span> {new Date().getFullYear()} </span>. all rights reserved
      </p>
    </footer>
  );
};

export default Footer;
