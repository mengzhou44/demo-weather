import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout';
import styles from './courses.module.css';
import Image from 'next/image';
import {categorize} from '../utils/categorize-courses'

export default function Course({categorized} ) {
  
  const [current, setCurrent] = useState('')
 
  function getGridTemplateRows(courses) {
       let temp =  Math.ceil(courses.length/2)
        return `repeat(${temp}, auto)`    
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
            {categorized.length === 0  && <div className={styles.loading}> Please wait ... </div>}

            {categorized.length>0  && categorized.map(item => {
              return <div
                key={item.category}
                className={`${styles.category} ${current === item.category ? styles.current : ''}`}
              >
                <h4 className={styles['category-name']} onClick={() => {
                  if (item.category === current) {
                     setCurrent('')
                  }else {
                    setCurrent(item.category)
                  }
                 
                 }
                }>{item.category}</h4>
                {
                  item.category === current &&
                  <div className={styles.courses}
                    style={{
                      gridTemplateRows: getGridTemplateRows(item.courses)
                    }}
                  >
                    {item.courses.map(course => <motion.div
                      key={course.id}
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
            <p className={styles.notes}> Course marked with * is one semester only</p>
          </div>
        </div>

      </div>
    </Layout>
  );
}


export async function getStaticProps() {

  const res = await fetch(`${process.env.BASE_URL}/courses`);
  const categorized = categorize(await res.json());
  return {
    props: {
       categorized
    },
  }
}



 
