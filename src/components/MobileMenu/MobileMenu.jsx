import { useState } from 'react';
import AppLogo from '../AppLogo/AppLogo';
import css from './MobileMenu.module.css';
import Icon from '../../shared/Icon/Icon';
import AppUserMenu from '../AppUserMenu/AppUserMenu';
import AppNavMenu from '../AppNavMenu/AppNavMenu';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log('User logged out');
  };

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };
  return (
    <div className={css.wrapper}>
      <AppLogo />
      <div className={css.menuWrapper}>
        <AppUserMenu />
        <button className={css.burgerBtn} onClick={toggleMenu}>
          <Icon iconId="icon-burger" className={css.icon} />
        </button>
      </div>
      {isOpen && (
        <div className={css.mobileMenu}>
          <div className={css.userWrapper}>
            <p className={css.userName}>User</p>
            <div className={css.iconWrapper}>
              <Icon iconId="icon-user" className={css.iconUser} />
            </div>
          </div>
          <button className={css.closeBtn} onClick={toggleMenu}>
            <Icon iconId="icon-close" className={css.iconClose} />
          </button>
          <AppNavMenu />
          <button
            type="button"
            className={css.buttonLogout}
            onClick={handleLogout}
          >
            Log out
            <Icon iconId="icon-arrow" className={css.iconArrow}></Icon>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
