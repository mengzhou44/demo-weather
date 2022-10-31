import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './sign-up.module.css';
import { useState, useEffect } from 'react';

import { magic } from '../utils/magic-client';
import { setLoginInfo } from '../utils/login-info';
import {Form1} from '../components/sing-up-forms/form1'
import {Form2} from '../components/sing-up-forms/form2'
import {Form3} from '../components/sing-up-forms/form3'


const SignUp = () => {
  const [user, setUser] = useState({})
  const [step, setStep] = useState(1)  
  const [isSigning, setIsSigning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      setIsSigning(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);
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

  function renderForm() {
      if (step === 1) {
          return <Form1 
             data={user}
             onNext={(data)=> {
              setUser(Object.assign(user, data))
              setStep(step+1) 
             }}></Form1>
      }
      else if (step === 2) {
        return  <Form2 
                    data={user}
                    onNext={data=> {
                      setUser(Object.assign(user, data))
                      console.log({user})
                      setStep(step+1)
                    } 
                   } 
                  onPrev={()=> setStep(step-1)}>
          
                </Form2>
      }  else if (step === 3) {
           return   <Form3
                        data={user}
                        onNext={data=> {
                          setUser(Object.assign(user, data))
                          setStep(step+1)
                        } 
                      } onPrev={()=> setStep(step-1)}>

                   </Form3>
      } 
       
  }


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
        {renderForm()}  
      </main>
    </div>
  );
};

export default SignUp;
