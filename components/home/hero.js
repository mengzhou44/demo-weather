import styles from './hero.module.css';
import { memo } from 'react';
import Link from 'next/link';
import { useDevice } from '../../hooks/use-device';
 

const Hero = () => {
  const device = useDevice();
  return (
    <section id="home" className={styles.hero}>
   
        <div className={styles.mission} >
        <h3>At AHA, our mission is to provide
international students a global education, preparing them for a
diverse world.</h3>
      </div>
    </section>
  );
};

export default memo(Hero);
