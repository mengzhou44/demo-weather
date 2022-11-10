import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/layout';
import Hero from '../components/home/hero';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
        <Hero />
      </Layout>
    </div>
  );
}
