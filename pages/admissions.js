import Head from 'next/head';
import { memo } from 'react';
import styles from './admissions.module.css'
import Layout from '../components/layout';
import Image from 'next/image';
import Link from 'next/link';

function Admissions() {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Admissions" />
      </Head>
      <Layout>
        <div className={styles.page}>
          <div className="title">
            <h2>
              Admissions
            </h2>
          </div>
          <div className={styles.container}>

            <div className={styles.content}>
              <div className={styles.section}>
                <p>
                  Agoura Hills Academy exists to provide a College Preparatory education to our students. Our goal is to work in partnership with parents and college counselors, to provide a solid academic foundation during a student’s formative years. Our integrated curriculum program gives us hope that we will ensure an excellent academic education that will prepare students for a global society.
                </p>
              </div>

              <div className={styles.section}>
                <h4>GOALS AND OBJECTIVES</h4>
                <p>
                  Agoura Hills Academy practices its philosophy by following the school&apos;s intellectual, social, and physical goals and objectives.
                </p>
                <div>
                  <Link href="/register" passHref>
                    <button className={styles.register} >
                      Register
                    </button>
                  </Link>

                </div>
              </div>
            </div>


            <div className={styles.pic}>
              <Image src='/static/admissions.jpg' width={565} height={463} alt='admissions' />
            </div>


          </div>
        </div>
      </Layout>
    </div>
  );
}

export default memo(Admissions)

