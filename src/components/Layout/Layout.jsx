import { useLocation } from 'react-router-dom';
import AppBar from '../Header/AppBar/AppBar';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const isWhiteBackground =
    location.pathname === '/register' || location.pathname === '/login';

  return (
    <div className={css.container}>
      <AppBar />
      <div
        className={isWhiteBackground ? css.whiteBackground : css.greyBackground}
      >
        <main className={css.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
