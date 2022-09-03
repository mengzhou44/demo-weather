import styles from './banner.module.css';
import { memo } from 'react';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className="container">
        <h1>scroll project</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas eos
          neque sunt in? Id, necessitatibus quos quisquam distinctio laudantium
          fugiat?
        </p>
        <a href="#tours" className="scroll-link btn btn-white">
          explore tours
        </a>
      </div>
    </div>
  );
};

export default memo(Banner);
