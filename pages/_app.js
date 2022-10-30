import 'react-toastify/dist/ReactToastify.css';
import './_app.css';
import { motion } from 'framer-motion';
import { configureStore } from '@reduxjs/toolkit';
import headerReducer from  '../state/header-slice';

 
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    header:  headerReducer,    
  },
});

function MyApp({ Component, pageProps, router }) {

  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
       <Provider store={store}>
           <Component {...pageProps} />
        </Provider> 
    </motion.div>
  );
}


export default MyApp;
