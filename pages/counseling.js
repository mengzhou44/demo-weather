import Head from 'next/head';
import styles from './counseling.module.css';
import Layout from '../components/layout';
import Image from 'next/image';
export default function Home() {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Scroll Prototype" />
      </Head>
      <Layout>
      <div className={styles.page}>
                    <div className="title">
                    <h2>
                      Counseling
                    </h2>
                  </div>
              <div className={styles.container}>      
                   <div className={styles.pic}>
                       <Image alt='couseling' src='/static/counselling.jpg' width={512} height={512} /> 
                   </div>
                   <div className={styles.content}>
                      <p className={styles.group1}> 
                      The college application process is a complicated task.  While the admissions officers' decisions are a mystery. At Agoura Hills Academy, we provide you with an accredited, competitive high school transcript and diploma. In addition, we offer you up to 4 hours’ complimentary college counseling service.  
                      </p>  
                      <div className={styles.group}>
                          <p className={styles.yourself}>
                          When thinking about college and university here are a few common questions to ask yourself: 
                          </p>
                          <ul>
                                <li>
                                What major should I choose?
                                </li>
                                <li>
                                How many colleges should I apply?
                                </li>
                                <li>
                                How to write a perfect application essay?
                                </li>
                                <li>
                                How much do my parents need to pay for my college?
                                </li>
                                <li>
                                How to fill out the FASFA?
                                </li>
                          </ul>

                      </div>

                      <div className={styles.group}>
                            <p> 
                              Our UCLA certified college counselor will guide you for college application step by step.
                              </p>
                              <p> 
                              Contact Ms. Zhu to make an appointment.
                              </p>
                              <p>
                              Email: zhu@agourahillsacademy.org 
                              </p>
                         </div>
                    </div>
              </div> 
      </div>
      </Layout>
    </div>
  );
}