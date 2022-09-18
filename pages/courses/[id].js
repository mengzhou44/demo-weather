import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './[id].module.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import { isSignedIn } from '../../utils/login-info';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';

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

  async function enrollCourse(e, course) {
    e.preventDefault();
    try {
      await fetch('/api/courses/enroll', {
        method: 'POST',
        body: JSON.stringify({ courseId: course.id }),
      });
      let res = await fetch(`/api/courses/${course.id}`);
      res = await res.json();
      setCourse(res);

      toast.success('Course is enrolled!');
    } catch (err) {
      toast.error('Somthing went wrong! Course can not be  enrolled!');
    }
  }

  function renderEnrollment(course) {
 
    if (isSignedIn()) {
      if (course.isEnrolled) {
        return <h3>enrolled!</h3>;
      }
      return <button onClick={(e) => enrollCourse(e, course)}>Enroll</button>;
    }
    return (
      <Link href={`/sign-in?redirect=/courses/${course.id}`}>
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
            <div className={styles['image-container']}>
              <Image
                src={course.imageUrl}
                alt="course image"
                width={320}
                height={213}
              />
            </div>
            <div>
              <h3>{course.name}</h3>
              <p>{course.category}</p>
              <p>{course.teacher}</p>
              <p>{course.description}</p>
              {renderEnrollment(course)}
            </div>
          </div>
        )}
        <ToastContainer
          className={styles.toast}
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Layout>
    </>
  );
}
