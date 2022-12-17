import Header from './header';
import Footer from './footer';
import styles from './layout.module.css'

const Layout = ({ children }) => {
 
  return (
    <div className={styles.layout}>
      <section className={styles.content}>
        <Header></Header>
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
