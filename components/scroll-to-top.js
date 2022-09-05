import { useState, useEffect } from 'react';
import styles from './scroll-to-top.module.css';

export function ScrollToTop() {
  const [scroll, setScroll] = useState({});
  const onScroll = () => {
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
    let scroll = {
      x: supportPageOffset
        ? window.pageXOffset
        : isCSS1Compat
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft,
      y: supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
        ? document.documentElement.scrollTop
        : document.body.scrollTop,
    };
    setScroll(scroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);
    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  }, []);

  if (scroll.y > 40)
    return (
      <button
        className={`${styles['scroll-top']}`}
        onClick={() => {
          window.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth',
          });
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
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    );
}
