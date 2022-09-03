import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/layout';
import Banner from '../components/home/banner';
import About from '../components/home/about';
import Services from '../components/home/services';
import Tours from '../components/home/tours';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
        <Banner />
        <About />
        <Services />
        <Tours />
      </Layout>
    </div>
  );
}
 