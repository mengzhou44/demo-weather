import Head from 'next/head';
import {useState, useEffect} from 'react'
import styles from './admin.module.css';
import { useRouter } from 'next/router';
import { getLoginInfo } from '../utils/login-info';
import Layout from '../components/layout';
import { redirect } from 'next/dist/server/api-utils';
 
export default function Admin() {
  const [message, setMessage] = useState('')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false);

  const router = useRouter()
 
  useEffect(() => {
     const login = getLoginInfo()
     if (login===null) {
        router.push('/sign-in?redirect=/admin')  
     } 
  }, []);

  useEffect(() => {
    async function fetchCourses() {
        try{
            setLoading(true);
            let res = await fetch(`/api/admin/courses`);
            res = await res.json();
            if (res.done===true) {
                setCourses(res.data);
            }else {
                setMessage(res.message) 
            }
        } catch (err) {
            setMessage(err)
        } finally {
            setLoading(false);
        }
    }
    fetchCourses();
  }, []);
 
 function renderContent() {
      if (loading) {
          return <h3>loading...</h3>
      }

      if (message) {
        return (<div className={styles.message}>
            {message}
         </div>)
      }  
      return  <div className={styles.courses}>
                <h3>Courses</h3>
                {courses.map(course=> {
                    return  <div key={course.id} >
                        {course.name}
                        <button>Delete</button>
                    </div>
                }
                )}
        </div>
  }

  console.log(courses)
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
            {renderContent()}
        </div>
      
    </Layout>
    </> 
  );
}
