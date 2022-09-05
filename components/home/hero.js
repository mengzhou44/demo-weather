import styles from './hero.module.css';
import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDevice } from '../../hooks/use-device';
import { scrollToSection } from '../../utils/scroll-to-section';
 
const Hero = () => {
  const device = useDevice();
  const router = useRouter();
  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <h1>scroll project</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas eos
          neque sunt in? Id, necessitatibus quos quisquam distinctio laudantium
          fugiat?
        </p>
        <Link href="/#services">
          <a
            className="scroll-link btn btn-white"
            onClick={(e) => {
               scrollToSection(e, device);
            }}
          >
            explore services
          </a>
        </Link>
      </div>
    </section>
  );
};

export default memo(Hero);
