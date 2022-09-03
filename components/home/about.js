import { memo } from 'react';
import styles from './about.module.css';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="title">
        <h2>
          about <span>us</span>
        </h2>
      </div>
    </section>
  );
};

export default memo(About)
