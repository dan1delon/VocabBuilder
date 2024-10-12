import AppLogo from '../AppLogo/AppLogo';
import AppNavMenu from '../AppNavMenu/AppNavMenu';
import AppUserMenu from '../AppUserMenu/AppUserMenu';
import MobileMenu from '../../Header/MobileMenu/MobileMenu';
import css from './AppBar.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.appHeader}>
      <div className={css.container}>
        <AppLogo />
        {isLoggedIn && (
          <>
            <AppNavMenu />
            <AppUserMenu />
          </>
        )}
      </div>
      <MobileMenu />
    </header>
  );
};

export default AppBar;
