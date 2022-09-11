import Link from 'next/link';
import Layout from '../../components/layout';
import styles from './index.module.css';
 
export default function Course({ courses }) {
  return (
    <Layout>
      <div className={styles.container}>
        <h3>Courses</h3>

        {courses.length > 0 &&
          courses.map((course) => (
            <div key={course.id}>
              <Link href={`/courses/${course.id}`}>
                <h4>{course.name}</h4>
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
