
import { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import {
   collapse 
} from  '../state/header-slice';

import Header from './header';
import Footer from './footer';
import styles from './layout.module.css'


const Layout = ({ children }) => {
  const dispatch = useDispatch();

   useEffect(() => {
    const handleDocumentClick = (e) => {
        e.stopPropagation();
        dispatch(collapse())
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dispatch]);

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
