import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <section>
        <Header></Header>
        {children}
      </section>
      <Footer />
    </>
  );
};

export default Layout;
