import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import AppBar from '../Header/AppBar/AppBar';
import css from './Layout.module.css';
import clsx from 'clsx';
import { toastOptions } from '../../helpers/toasterOptions';
import { ScrollProvider } from '../../context/ScrollContext';

const Layout = ({ children }) => {
  const location = useLocation();

  const isWhiteBackground =
    location.pathname === '/register' || location.pathname === '/login';

  return (
    <ScrollProvider>
      <div
        className={clsx(css.container, {
          [css.backgroundImage]: isWhiteBackground,
        })}
      >
        <AppBar />
        <div
          className={
            isWhiteBackground ? css.whiteBackground : css.greyBackground
          }
        >
          <main className={css.content}>
            <Toaster position="top-right" toastOptions={toastOptions} />
            {children}
          </main>
        </div>
      </div>
    </ScrollProvider>
  );
};

export default Layout;
