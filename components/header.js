import styles from './header.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { scrollToSection } from '../utils/scroll-to-section';
import { useDevice } from '../hooks/use-device';
import { motion } from 'framer-motion';
import { getLoginInfo, clearLoginInfo } from '../utils/login-info';

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [selected, setSelected] = useState('');
  const [firstName, setFirstName] = useState(null);

  const device = useDevice();
  const router = useRouter();
  const isHomePage = !router.asPath.includes('/courses');

  useEffect(() => {
    setFirstName(getLoginInfo());
  }, []);

  useEffect(() => {
    const { pathname, asPath } = router;
    if (pathname === '/') {
      if (asPath.endsWith('about')) {
        setSelected('about');
      } else if (asPath.endsWith('admission')) {
        setSelected('admission');
      } else if (asPath.endsWith('academics')) {
        setSelected('academics');
      } else {
        setSelected();
      }
    } else if (pathname.includes('/courses')) {
      setSelected('courses');
    }
  }, []);

  function renderHomeLink(section) {
    let linkClassName = '';
    if (section === selected) {
      linkClassName = styles['link-selected'];
    }
    return (
      <li>
        <Link href={`/#${section}`}>
          <a
            onClick={(e) => {
              setSelected(section);
              if (isHomePage) {
                scrollToSection(e, device);
              }
            }}
            className={linkClassName}
          >
            {section}
          </a>
        </Link>
      </li>
    );
  }

  function renderSignIn() {
    return (
      <Link href="/sign-in">
        <button className="btn">Sign in</button>
      </Link>
    );
  }

  function renderSignOut() {
    return (
      <div className={styles['sign-out']}>
        <p>{`Hi, ${firstName.toUpperCase()}`}</p>
        <button
          className="btn"
          onClick={async (e) => {
            e.preventDefault();
            await fetch('/api/sign-out', {
              method: 'POST',
            });

            clearLoginInfo();
            setFirstName(null);
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  function renderAuth() {
    return (
      <div className={styles.auth}>
        {firstName === null ? renderSignIn() : renderSignOut()}
      </div>
    );
  }
  function renderPageLink(section) {
    let linkClassName = '';
    if (section === selected) {
      linkClassName = styles['link-selected'];
    }
    return (
      <li>
        <Link href={`/${section}`}>
          <a
            onClick={() => {
              setSelected(section);
            }}
            className={linkClassName}
          >
            courses
          </a>
        </Link>
      </li>
    );
  }

  function renderLinks() {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
          },
          transition: {
            delay: 0.6,
          },
        }}
        id="links"
        className={styles.links}
        onClick={() => setShowLinks(false)}
      >
        {renderHomeLink('about')}
        {renderHomeLink('academics')}
        {renderHomeLink('admission')}
        {renderPageLink('courses')}
      </motion.div>
    );
  }

  function renderLogo() {
    return (
      <Link href={`/#home`}>
        <div className={styles.logo} onClick={() => setSelected('')}>
          <img src="/static/logo.jpg" className={styles.logo} alt="logo" />
        </div>
      </Link>
    );
  }

  if (device === 'large') {
    return (
      <nav id="nav" className={styles.nav}>
        <div className={styles.container}>
          {renderLogo()}
          {renderAuth()}
          {renderLinks()}
        </div>
      </nav>
    );
  }

  let navClassName = styles.nav;
  if (showLinks === true) {
      navClassName = `${styles.nav} ${styles.expanded}`;
  }

  return (
      <nav id="nav" className={navClassName}>
        <div className={styles.container}>
          {renderLogo()}
          {renderAuth()}

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

export default Header;
