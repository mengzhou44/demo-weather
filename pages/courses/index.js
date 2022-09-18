import Link from 'next/link';
import Layout from '../../components/layout';
import styles from './index.module.css';
import Image from 'next/image';

export default function Course({ courses }) {
  return (
    <Layout>
      <div className={styles.container}>
        <h3>Courses</h3>

        {courses.length > 0 &&
          courses.map((course) => (
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
    </Layout>
  );
}

export async function getStaticProps() {
  let courses = await fetch(`${process.env.BASE_URL}/api/courses`);
  courses = await courses.json();
  return {
    props: {
      courses,
    },
  };
}
