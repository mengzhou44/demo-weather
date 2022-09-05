import styles from './header.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { scrollToSection } from '../utils/scroll-to-section';
import { useDevice } from '../hooks/use-device';

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [selected, setSelected] = useState();
  const device = useDevice();
  const router = useRouter();

  const isHomePage = router.asPath !== '/courses';

  useEffect(() => {
    const { pathname, asPath } = router;
    if (pathname === '/') {
      if (asPath.endsWith('services')) {
        setSelected('services');
      } else if (asPath.endsWith('about')) {
        setSelected('about');
      } else {
        setSelected('home');
      }
    } else if (pathname === '/courses') {
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

  function renderAuth() {
    return (
      <div className={styles.auth}>
        <button className="btn">Sign in</button>
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
      <div
        id="links"
        className={styles.links}
        onClick={() => setShowLinks(false)}
      >
        {renderHomeLink('home')}
        {renderHomeLink('about')}
        {renderHomeLink('services')}
        {renderPageLink('courses')}
      </div>
    );
  }

  if (device !== 'large') {
    let navClassName = styles.nav;
    if (showLinks === true) {
      navClassName = `${styles.nav} ${styles.expanded}`;
    }
    return (
      <nav id="nav" className={navClassName}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="/static/logo.svg" className={styles.logo} alt="logo" />
          </div>
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
  return (
    <nav id="nav" className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/static/logo.svg" className={styles.logo} alt="logo" />
        </div>
        {renderAuth()}
        {renderLinks()}
      </div>
    </nav>
  );
};

export default Header;
