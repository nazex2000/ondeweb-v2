// components/Layout.js
import Header from './Header';
import Footer from './Footer';
import'../css/layout.css';
//import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};


export default Layout;
