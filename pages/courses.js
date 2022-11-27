import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout';
import styles from './courses.module.css';
import Image from 'next/image';

export default function Course() {
  const [categorized, setCategorized] = useState([]);
  const [current, setCurrent] = useState('')

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch('/api/courses');
      const courses = await res.json();
      setCategorized(
        categorize(courses)
      )
    }

    fetchCourses()

  }, [])

  function categorize(courses) {
    let res = []

    for (let course of courses) {
      let found = res.find(item => item.category === course.category)
      if (!found) {
        res.push({
          category: course.category,
          courses: [
            {
              id: course.id,
              name: course.name
            }
          ]
        })
      } else {
        found.courses.push({
          id: course.id,
          name: course.name
        })
      }
    }
    return res
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className='title'>
          <h2>Courses</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.pic}>
            <Image src='/static/courses.jpg' alt='courses' width={525} height={499} />
          </div>
          <div className={styles.content}>
            {categorized.map(item => {
              return <div
                key={item.category}
                className={`${styles.category} ${current === item.category ? styles.current : ''}`}
              >
                <h4 className={styles['category-name']} onClick={() => setCurrent(item.category)}>{item.category}</h4>
                {
                  item.category === current &&
                  <div className={styles.courses}>
                    {item.courses.map(course => <motion.div
                      className={styles.course}
                      initial="closed"
                      animate="open"
                      variants={{
                        closed: {
                          height: 0
                        },
                        open: {
                          height: "auto"
                        },
                        transition: {
                          delay: 0.6,
                        },
                      }}>

                      {course.name}
                    </motion.div>)
                    }
                  </div>
                }
              </div>
            })}
          </div>
        </div>

      </div>
    </Layout>
  );
}
