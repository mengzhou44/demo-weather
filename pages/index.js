import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/layout';
import Hero from '../components/home/hero';
import About from '../components/home/about';
import Admission from '../components/home/admission';
import Counseling from '../components/home/counseling';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { scrollToSectionByPath } from '../utils/scroll-to-section';
import { useDevice } from '../hooks/use-device';
import { ScrollToTop } from '../components/scroll-to-top';
export default function Home() {
  const router = useRouter();
  const device = useDevice();
  const { asPath } = router;

  useEffect(() => {
    if (asPath !== '/') {
      setTimeout(() => {
        scrollToSectionByPath(asPath, device);
      }, 1);
    }
  }, [asPath, device]);

  return (
    <div className={styles.container}>
      <ScrollToTop />
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
        <Hero />
        <About />
        <Admission />
        <Counseling />
      </Layout>
    </div>
  );
}
