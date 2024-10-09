import { useLocation } from 'react-router-dom';
import AppBar from '../Header/AppBar/AppBar';
import css from './Layout.module.css';
import clsx from 'clsx';

const Layout = ({ children }) => {
  const location = useLocation();

  const isWhiteBackground =
    location.pathname === '/register' || location.pathname === '/login';

  return (
    <div
      className={clsx(css.container, {
        [css.backgroundImage]: isWhiteBackground,
      })}
    >
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
