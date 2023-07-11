  import { Outlet } from 'react-router-dom';
  import Navigation from './Navigation';
  import Footer from './Footer';
  import '../App.css';
  import { AuthContextProvider } from '../context/AuthContext';
  import {CountryCodeContextProvider} from '../context/CountryCodeContext';
  const Root = () => {
    return (
      <>
        <AuthContextProvider>
        <CountryCodeContextProvider>
          <Navigation />
  
          <div>
            <Outlet />
          </div>

          <Footer />
        </CountryCodeContextProvider>
        </AuthContextProvider>
        
      </>
    );
  };
  
  export default Root;
  