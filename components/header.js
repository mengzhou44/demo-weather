import styles from './header.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { useDevice } from '../hooks/use-device';
import { motion } from 'framer-motion'; 
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
   expand,
   collapse
} from '../state/header-slice';

const Header = () => {
 
  const [selected, setSelected] = useState('');
 
  const {linksExpanded} = useSelector(store=>  store.header)
  
  const device = useDevice();
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    const { pathname} = router;

    if (pathname.includes('/about')) {
      setSelected('about');
    }
    else if (pathname.includes('/admissions')) {
      setSelected('admissions');
    }
    else if (pathname.includes('/counseling')) {
      setSelected('counseling');
    }
    else if (pathname.includes('/courses')) {
      setSelected('courses');
    }
  }, [router]);
 

  function renderPageLink(pageName) {
    let linkClassName = '';
    if (pageName === selected) {
      linkClassName = styles['link-selected'];
    }
    return (
      <li>
        <Link href={`/${pageName}`}>
          <a
            onClick={() => {
              setSelected(pageName);
            }}
            className={linkClassName}
          >
             {pageName}
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
        onClick={() => dispatch(collapse())}
      >
        {renderPageLink('about')}
        {renderPageLink('admissions')}
        {renderPageLink('counseling')}
        {renderPageLink('courses')}
      </motion.div>
    );
  }

  function renderLogo() {
    return (
      <Link href={`/`}>
        <div
          className={styles.logo}
          onClick={() => {
            setSelected('');
            dispatch(collapse());
          }}
        >
          <Image src="/static/logo.jpg"  alt="logo" width={192} height={48} />
        </div>
      </Link>
    );
  }

  if (device === 'large') {
    return (
      <nav id="nav" className={styles.nav}>
        <div className={styles.container}>
          <div className={styles['nav-content']}>
            {renderLogo()}
            {renderLinks()}
          </div>
        </div>
      </nav>
    );
  }

  let navClassName = styles.nav;
  if (linksExpanded=== true) {
    navClassName = `${styles.nav} ${styles.expanded}`;
  }

  return (
    <nav id="nav" className={navClassName}>
      <div className={styles.container}>
        <div className={styles['nav-content']}>
          {renderLogo()}
        
          <button
            className={styles.toggle}
            onClick={(e) => {
              e.stopPropagation();
              if (linksExpanded){
                dispatch(collapse())
              } else {
                dispatch(expand())
             }
            }
          }    
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
      </div>
      {linksExpanded && renderLinks()}
    </nav>
  );
};

export default Header;
