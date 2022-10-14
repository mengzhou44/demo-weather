import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './sign-in.module.css';
import { useState, useEffect } from 'react';
import validator from 'email-validator';
import { magic } from '../utils/magic-client';
import { setLoginInfo } from '../utils/login-info';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

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

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setIsSigning(true);
      const didToken = await magic.auth.loginWithMagicLink({ email });
      if (didToken) {
        let res = await fetch('/api/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${didToken}`,
          },
        });
        console.log({didToken})
        res = await res.json();
        if (res.done) {
          setLoginInfo(res.firstName);
          if (redirect) {
            router.push(redirect);
          } else {
            router.push('/');
          }
        } else {
          setUserMessage(res.message);
          console.log('something went wrong!');
          setIsSigning(false);
        }
      }
    } catch (err) {
      console.error(err);
      setIsSigning(false);
    }
  };

  const handleTextChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== '' && !validator.validate(e.target.value)) {
      setUserMessage('Enter valid email address!');
    } else {
      setUserMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign in</title>
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
        <h3 className={styles.title}>Sign In</h3>
        <input
          className={styles['txt-email']}
          type="text"
          placeholder="Email address"
          value={email}
          onChange={handleTextChange}
        ></input>
        <p>{userMessage}</p>
        <button className={styles['btn-sign-in']} onClick={handleSignIn}>
          {isSigning ? 'Signing in ...' : 'Sign in'}
        </button>
        <div className={styles['sign-up']}>
          <p>
            Not signed up yet? <Link href="/sign-up">Sign up now</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
