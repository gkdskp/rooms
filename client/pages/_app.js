import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import "react-datepicker/dist/react-datepicker.css";
import { AuthContextProvider } from './auth';

function Rooms({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} /> 
    </AuthContextProvider>
  );
}

export default Rooms;
