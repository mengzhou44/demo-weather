import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import styles from './index.module.css';
import Image from 'next/image';

export default function Academics() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      let res = await fetch(`/api/courses`);
      res = await res.json();

      setCourses(res);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        {loading && <h3>loading... </h3>}

        {!loading && (
          <div>
            <h3>Courses</h3>
            {courses.map((course) => (
              <div key={course.id}>
                <Link href={`/courses/${course.id}`}>
                  <div>
                    <h4>{course.name}</h4>
                    <Image
                      src={course.imageUrl}
                      alt="course image"
                      width={320}
                      height={213}
                    />
                  </div>
                </Link>

                <p>{course.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
