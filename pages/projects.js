import Head from 'next/head';
import { memo } from 'react';
import styles from './projects.module.css'
import Layout from '../components/layout';
import Image from 'next/image';
import Link from 'next/link';

function Projects() {
  return (
    <div>
      <Head>
        <title>Easy Express Solutions Inc. Projects</title>
        <meta name="description" content="Projects" />
      </Head>
      <Layout>
        <div className={styles.page}>
          <div className="title">
            <h2>
                Projects
            </h2>
          </div>
          <div className={styles.container}>

            <div className={styles.content}>
         
            </div>

          </div>
        </div>
      </Layout>
    </div>
  );
}

export default memo(Projects)

