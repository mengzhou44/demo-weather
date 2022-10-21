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
        <h3>Achieve Anything You Put Your Mind To With Agoura Hills</h3>
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
