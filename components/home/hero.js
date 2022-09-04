import styles from './hero.module.css';
import { memo } from 'react';
const Hero = () => {

  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <h1>scroll project</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas eos
          neque sunt in? Id, necessitatibus quos quisquam distinctio laudantium
          fugiat?
        </p>
        <a
          href="#tours"
          className="scroll-link btn btn-white"
        >
          {' '}
          explore tours
        </a>
      </div>
    </section>
  );
};

export default memo(Hero);
