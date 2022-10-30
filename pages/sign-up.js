import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './sign-up.module.css';
import { useState, useEffect } from 'react';
import validator from 'email-validator';
import { magic } from '../utils/magic-client';
import { setLoginInfo } from '../utils/login-info';

const SignUp = () => {
  const [email, setEmail] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [userMessage, setUserMessage] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      setIsSigning(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, [router]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const valid = validateInputs();
    if (valid === false) return;

    try {
      setIsSigning(true);
      const didToken = await magic.auth.loginWithMagicLink({ email });
      if (didToken) {
        let res = await fetch('/api/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${didToken}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        });
        res = await res.json();
        if (res.done) {
          setLoginInfo(firstName);
          router.push('/');
        } else {
          setUserMessage(res.message);
          setIsSigning(false);
        }
      }
    } catch (err) {
      console.log('something went wrong!');
      console.error(err);
      setIsSigning(false);
    }
  };

  const validateInputs = () => {
    setUserMessage('');
    if (email === '') {
      setUserMessage('Email is required!');
      return false;
    } else if (email !== '' && !validator.validate(email)) {
      setUserMessage('Enter valid email address!');
      return false;
    } else if (firstName === '') {
      setUserMessage('First name is required!');
      return false;
    } else if (lastName === '') {
      setUserMessage('Last name is required!');
      return false;
    }
    return true;
  };

  const handleEmailTextChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameTextChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameTextChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign up</title>
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles['logo-link']}>
            <div className={styles['logo-wrapper']}>
              <Image
                src="/static/logo.png"
                alt="logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>
      </header>
      <main className={styles.main}>
      <div className={styles.close}>
        <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          </Link>
        </div>
        <h2 className={styles.title}>Sign Up</h2>
        <div className={styles.inputs}>
          <div className={styles.field}>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={handleEmailTextChange}
            ></input>
          </div>

          <div className={styles.field}>
            <label htmlFor="firstName">First name *</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameTextChange}
            ></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="lastName">Last name *</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameTextChange}
            ></input>
          </div>
          <p>{userMessage}</p>
        </div>
        <button className={styles['btn-sign-up']} onClick={handleSignUp}>
          {isSigning ? 'Signing Up...' : 'Sign up'}
        </button>
      </main>
    </div>
  );
};

export default SignUp;
