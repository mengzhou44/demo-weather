import Head from 'next/head';
import styles from './company.module.css';
import { memo } from 'react';
import Image from 'next/image';
import Layout from '../components/layout';

function Company() {
  const clients = [
    'Expedia Group',
    'Wells Fargo',
    'The City of Calgary',
    'Enmax',
    'Shaw Communications',
    'GE Energy',
    'Concord Well Servicing',
    'Olympia Financial Group',
    'Dynamysk Automation',
    'C4i Consultants',
    'Calsim Technology',
    'Pioneer Petrotech Services',
    'Clickdishes',
    'Computer Aid Professional Services',
    'Wiles Jackson Inc'
  ]

  return (
    <div>
      <Head>
        <title>Company</title>
        <meta name="description" content="Company" />
      </Head>
      <Layout>
        <section className={styles.page}>
          <div className={styles.container}>
            <div className={styles.title}>
              <a className={styles.linkedIn} href="https://www.linkedin.com/in/mengzhou44" target="__blank">
                <Image className={styles.photo} src="/static/my-photo.jpeg" alt="myphoto" width={60} height={60} />
                <Image className={styles.linkedIn} src="/static/linkedin.svg" alt="linked-in" width={15} height={15} />
              </a>

              <h2>
                Company
              </h2>

              <a className={styles.github} href="https://github.com/mengzhou44" target="__blank">
                <Image src="/static/github.svg" alt="github" width={60} height={60} />
              </a>
            </div>


            <p className={styles.summary}>
              Easy Express Solutions Inc. was founded in 2006.  We offer a variety of software consulting services, this includes but not limitted to
              web, mobile, desktop application development, research,  prototype, analysis, design, development, test, build, deployment, maintenance,
              performance optimization, migration, rewrite, security, architecture, UI desgin, and project management etc.
            </p>

            <div className={styles.clients}>
              <h4>Our Clients</h4>
              <ul className={styles.clientList}>
                {
                  clients.map(client => <li className={styles.client} key={client}>{client}</li>)
                }
              </ul>
            </div>
            <br />
            <br />
          </div>
        </section>

      </Layout>
    </div>
  );
}

export default memo(Company)
