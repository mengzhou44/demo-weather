import styles from './hero.module.css';
import { memo } from 'react';
import Link from 'next/link';
import { useDevice } from '../../hooks/use-device';
import { scrollToSection } from '../../utils/scroll-to-section';

const Hero = () => {
  const device = useDevice();
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.text} >
        <h3>Achieve Your College Dream With </h3>
        <h3 className={styles.school}> Agoura Hills Academy </h3>
        </div>
      
        <Link href="/#admission">
          <a
            className="scroll-link btn btn-white"
            onClick={(e) => {
              scrollToSection(e, device);
            }}
          >
              Get Started
          </a>
        </Link> 
      </div>
    </section>
  );
};

export default memo(Hero);
