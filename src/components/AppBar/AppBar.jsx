import AppLogo from '../AppLogo/AppLogo';
import AppNavMenu from '../AppNavMenu/AppNavMenu';
import AppUserMenu from '../AppUserMenu/AppUserMenu';
import css from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={css.appHeader}>
      <div className={css.container}>
        <AppLogo />
        <AppNavMenu />
        <AppUserMenu />
      </div>
    </header>
  );
};

export default AppBar;
