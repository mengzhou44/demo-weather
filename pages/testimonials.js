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
          <div className='title'>
            <h2>
              Testimnonials
            </h2>
          </div>


          <div className={styles.container}>

            <blockquote className={styles.blockquote}>
              Daniel took ownership, built a complete React responsive web-application and delivered
              the functionality as planned. He also took initiative in solving hard problems on the
              backend. Daniel is patient, honest, straightforward as well as an overall great critical
              thinker with a contagious positive attitude.
              <cite className={styles.cite}>Vlad Sarpe, CTO at Clickdishes</cite>
            </blockquote>


            <blockquote className={styles.blockquote}>
              Daniel's been working with me on an on-going SaaS platform that is in continual
              evolution and development. He was able to to bring to life new developments and concepts
              successfully with quick response, thorough testing and easy acceptance of changes.
              <cite className={styles.cite}>Stephanie Rayment, rewardBANK Manager at AIR MILES INCENTIVES</cite>
            </blockquote>

            <blockquote className={styles.blockquote}>
              Daniel did an outstanding job to enhance and upgrade on our current outdated system. The
              project was not just meet the requirement time but the design was superb user friendly
              and efficiency. Less time and steps to complete our daily end of day task. Daniel is a
              very innovative with a very positive approach to fullfill our endless demand on changes
              to meet our needs. It was a pleasure to work with Daniel and am strongly recommened.
              <cite className={styles.cite}>Sarah Ma, Chief Cash Controller at City of Calgary</cite>
            </blockquote>


            <blockquote className={styles.blockquote}>
              I had the pleasure of working with Daniel to deliver on some software changes which were
              required to comply with regulations, and where absolute error-free compliance was
              mandatory. Daniel's attention to detail was a perfect fit. Daniel has an extremely high
              commitment to quality- even to the extent that he contacted me the day after we deployed
              the software to production, more than a full month after Daniel's contract had ended, to
              check on how the go-live went...
              <cite className={styles.cite}>Jennifer Langston, CPA, CMA, Project Manager at Enmax</cite>
            </blockquote>
          </div>
        </section>

      </Layout>
    </div>
  );
}

export default memo(Testimonials)

