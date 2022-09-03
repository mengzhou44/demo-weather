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

  if (device !== 'large') {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
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
