import { memo } from 'react';
import styles from './counseling.module.css';

const Counseling = () => {
  return (
    <section id="counseling" className={styles.container}>
   
      <div className="title">
        <h2>
          Counseling
        </h2>
      </div>
     
      <div className={styles.content}>

          <h4 className={styles.summary}> 
          We offer free college counseling and help students to apply to over 20 universities 
          </h4>

          <h4>
          UC Riverside Partnership
          </h4>

          <p>
           We have partnered with UC Riverside to offer a dual program. After completing high school diploma with <span className={styles.bold}> Agoura Hills Academy</span>, students will be able to receive a  Preliminary Acceptance Letter from UC Riverside simultaneously. 					    
        </p> 
      </div>

     
								
 
    </section>
  );
};

export default memo(Counseling)


					
					
					
					
					
					
					
