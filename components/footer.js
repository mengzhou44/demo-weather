import styles from './footer.module.css';
const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <p>
        copyright &copy; backroads travel tours company
        <span> {new Date().getFullYear()} </span>. all rights reserved
      </p>
    </footer>
  );
};

export default Footer;
