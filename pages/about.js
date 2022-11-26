import Head from 'next/head';
import Image from 'next/image';
import styles from './about.module.css';
import { memo } from 'react';
import Layout from '../components/layout';

function About() {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
      <section id="about" className={styles.page}>
    

            <div className="title">
                    <h2>
                      About
                    </h2>
                  </div>
                            <div className={styles.summary}>
            <h4>
              Agoura Hills Academy is a distance learning 9 –12 accredited high school located in Los Angeles, California. Our goal is to bridge students applying to U.S. High School and Universities.  
            </h4>
          </div>


          <div className={styles.container}>
            <div className={styles.pic}>
                  <Image src='/static/about.jpg' alt='about' width={400} height={400} />
            </div>
      
            <div className={styles.content}>

         
          <div className={styles.section}>
            <p><span className={styles.bold}> Curriculum - </span>
            Agoura Hills Academy provides all UC/CSU (A-G) approved coursework. 
            Our schedule is tailor made to meet each student's different learning style.  
            </p>
          </div>
          
          <div className={styles.section}>
              <p className={styles.simple}><span className={styles.bold}>Synchronous (with instructor) and Asynchronous (without instructor) - </span>
              We recognize we all have different learning styles.  Therefore, we offer synchronous and/or Asynchronous classes.  
            </p>
          </div>


          <div className={styles.section}>
          <p className={styles.simple}><span className={styles.bold}>Teachers and Staff - </span>
            Our leadership team is dedicated to hiring the most experienced teachers to understand the needs of each individual student.
            </p>   
          </div>


            <div className={styles.section}>
            <p className={styles.simple}><span className={styles.bold}>Schedule - </span>
            As our students are members of a global society, our flexible schedules meet students' needs no matter where they are located. 
              </p>   
            </div>

            <div className={styles.section}> 
            <p className={styles.simple}><span className={styles.bold}>Class Size - </span>
            one to one / small class / regular class
            </p>
            </div>
        
            </div>
    
          </div> 
    
      </section>

      </Layout>
    </div>
  );
}

export default memo(About)




