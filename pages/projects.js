import Head from 'next/head';
import { memo } from 'react';
import styles from './projects.module.css'
import Layout from '../components/layout';

function Projects() {
  return (
    <div>
      <Head>
        <title>Easy Express Solutions Inc. Projects</title>
        <meta name="description" content="Projects" />
      </Head>
      <Layout>
        <div className={styles.page}>
          <div className='title'>
            <h2>
               Web Projects
            </h2>

          </div>
          <div className={styles.container}>

                 <a className={styles.link} href='https://order.clickdishes.com/' target='_blank'>
                    Click Dishes
                </a>
                <a className={styles.link} href=''>
                    Agoura Hills Academy
                </a>

           
                <a className={styles.link} href=''>
                    Youtube Videos
                </a>
                <a className={styles.link} href=''>
                    News Feed
                </a>

                <a className={styles.link} href=''>
                    Local Weather 
                </a>

                <a className={styles.link} href=''>
                    Tangerine Home Page 
                </a>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default memo(Projects)

