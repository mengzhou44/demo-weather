import Head from 'next/head';
import {useState, useEffect} from 'react'
import styles from './admin.module.css';
import { useRouter } from 'next/router';
import { getLoginInfo } from '../utils/login-info';
import Layout from '../components/layout';
 
export default function Admin() {
  const [message, setMessage] = useState('')
  const router = useRouter()
 
  useEffect(() => {
     const login = getLoginInfo()
     if (login===null) {
        router.push('/sign-in?redirect=/admin')  
     } 
  }, []);

  function renderMessage() {
    return <div className={styles.message}>
             {message}
        </div>
  }

  function renderCourses(){
 
      return <h3 className={styles.courses}>Courses</h3>
  }

  return (
   <>
    <Head>
      <title>Admin</title>
      <meta name="description" content="Manage Courses" />
    </Head>
    <Layout>
        <div className={styles.container}>
            <div className={styles.title}>
               <h3>
                  Admin
               </h3> 
            </div>
           {message && renderMessage()}
           {!message && renderCourses()}
        </div>
      
    </Layout>
    </> 
  );
}
