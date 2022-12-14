import Head from 'next/head';
import styles from './testimonials.module.css';
import { memo } from 'react';
import Layout from '../components/layout';

function Testimonials() {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
      <section className={styles.page}>
            <div className="title">
                    <h2>
                      Testimnonials
                    </h2>
                  </div>
          <div className={styles.summary}>
            <p>
            
            </p>
          </div>


          <div className={styles.container}>
            <div className={styles.pic}>
              
            </div>
      
          <div className={styles.content}>

         
          <div className={styles.section}>
            <p><span className={styles.bold}> Curriculum - </span>
        
            </p>
          </div>
         
          </div>
    
          </div> 
    
      </section>

      </Layout>
    </div>
  );
}

export default memo(Testimonials)




