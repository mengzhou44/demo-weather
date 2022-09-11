import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './[id].module.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import { isSignedIn } from '../../utils/login-info';

export default function () {
  const [course, setCourse] = useState(null);
  const router = useRouter();
 
  useEffect(() => {
    if (!router.isReady) return;
    async function fetchCourse() {
      const { id } = router.query;
      let res = await fetch(`/api/courses/${id}`);
      res = await res.json();
      setCourse(res);
    }
    fetchCourse();
  }, [router.isReady]);

  function renderEnrollment(course) {
    if (isSignedIn()) {
      if (course.isEnrolled) {
        return <h3>enrolled!</h3>;
      }
      return <button>Enroll</button>;
    }
    return (
      <Link href="/sign-in">
        <button>Enroll</button>
      </Link>
    );
  }

  return (
    <>
      <Head>
        <title>Course Details</title>
      </Head>
      <Layout>
        {course && (
          <div className={styles.container}>
            <h3>{course.name}</h3>
            <p>{course.category}</p>
            <p>{course.teacher}</p>
            <p>{course.description}</p>
            {renderEnrollment(course)}
          </div>
        )}
      </Layout>
    </>
  );
}
