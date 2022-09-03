import styles from './header.module.css';
import { useState } from 'react';
import { useDevice } from '../hooks/use-device';

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const device = useDevice();

  function renderLinks() {
    return (
      <div className={styles.links}>
        <li>
          <a href="#home">home</a>
        </li>
        <li>
          <a href="#about">about</a>
        </li>
        <li>
          <a href="#services">services</a>
        </li>
        <li>
          <a href="#tours">tours</a>
        </li>
      </div>
    );
  }

  console.log({ device });
  if (device === 'mobile') {
    return (
      <nav id="home" className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="/static/logo.svg" className={styles.logo} alt="logo" />
          </div>
          <button
            className={styles.toggle}
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            menu
          </button>
        </div>
        {showLinks && renderLinks()}
      </nav>
    );
  }
  return (
    <nav id="home" className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/static/logo.svg" className={styles.logo} alt="logo" />
        </div>
        {renderLinks()}
      </div>
    </nav>
  );
};

export default Header;
