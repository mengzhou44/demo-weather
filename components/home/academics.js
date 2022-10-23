import { memo } from 'react';
import styles from './academics.module.css';

const Academics = () => {
  return (
    <section id="academics" className={styles.container}>

   
      <div className="title">
        <h2>
          Academics
        </h2>
      </div>
 
    </section>
  );
};

export default memo(Academics)
