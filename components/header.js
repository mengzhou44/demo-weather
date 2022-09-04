import styles from './header.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { scrollToSection } from '../utils/scroll-to-section';
import { useDevice } from '../hooks/use-device';
import { useRouter } from 'next/router';
const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const device = useDevice();
  const router = useRouter();
  const isHomePage = router.asPath !== '/courses';

  function renderHomeLink(section) {
    return (
      <li>
        <Link
          href={`/#${section}`}
          onClick={(e) => {
            if (isHomePage) {
              scrollToSection(e, device);
            }
          }}
        >
          {section}
        </Link>
      </li>
    );
  }

  function renderLinks() {
    return (
      <div id="links" className={styles.links} onClick={()=> setTimeout(()=> {setShowLinks(false)}, 200)}>
        {renderHomeLink('home')}
        {renderHomeLink('about')}
        {renderHomeLink('services')}
        {renderHomeLink('tours')}
        <li>
          <Link href="/courses">courses</Link>
        </li>
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
        {renderLinks()}
      </div>
    </nav>
  );
};

export default Header;
