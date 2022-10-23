import { memo } from 'react';
import styles from './admission.module.css'

const Admission = () => {
  return (
    <section id="admission" className= {styles.container}>
      <div className={styles.content}>      
        <div className="title">
          <h2>
            Admissions
          </h2>
        </div>
        <h4>Flexibile Enrollment</h4>
      </div>
    </section>
  );
};


export default memo(Admission);
