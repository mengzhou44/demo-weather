import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/layout';
import About from '../components/about';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
        <About />
      </Layout>
    </div>
  );
}