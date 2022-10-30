import { memo } from 'react';
import styles from './about.module.css';

const About = () => {
  return (
    <section id="about" className={styles.container}>
     
      <div className="title">
        <h2>
          About 
        </h2>
      </div>
       
      <div className={styles.content}>
        <div className={styles.summary}>
           <h4>Agoura Hills Academy is a college preparatory High School in Los Angeles</h4>
        </div>
      
      <div className={styles.section}>
          <p><span className={styles.bold}> Curriculum: </span>
             We provide all UC/CSU approved courses to meet different academic needs.
          </p>
           <ul>
            <li>High School Level</li>
            <li>College Prepatory</li>
            <li>Honor</li>
            <li>AP</li>
         </ul>
       
      </div>
              
      <div className={styles.section}>
             <p className={styles.simple}><span className={styles.bold}>Synchronous:</span>
             All our classes are live in real time to ensure our students&lsquo; success.
          </p>
      </div>
      
        
      <div className={styles.section}>
      <p className={styles.simple}><span className={styles.bold}>Staff:</span>
          We employee experienced teachers who understand international students needs. 
          </p>   
      </div>
      

      <div className={styles.section}>
      <p className={styles.simple}><span className={styles.bold}>Schedule:</span>
      We offer a flexible schedule that works around local school time. 
          </p>   
      </div>
      
      <div className={styles.section}> 
        <p className={styles.bold}>Class Size:</p>
          <ul>
              <li>One-on-one classes</li>
              <li>Small class sizes</li>
              <li>Regular class sizes</li>
          </ul>
      </div>
     </div>
    </section>
  );
};

export default memo(About)
