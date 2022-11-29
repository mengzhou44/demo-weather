import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout';
import styles from './courses.module.css';
import Image from 'next/image';
import useCategorized from '../hooks/use-categorized';

export default function Course() {
  
  const [current, setCurrent] = useState('')
  
  const [fetched, categorized]  = useCategorized(); 
  
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
            {fetched === false  && <div className={styles.loading}> Please wait ... </div>}

            {fetched  && categorized.map(item => {
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
