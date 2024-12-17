import { useState, useRef, useEffect } from 'react';
import AppLogo from '../AppLogo/AppLogo';
import css from './MobileMenu.module.css';
import Icon from '../../../shared/Icon/Icon';
import AppUserMenu from '../AppUserMenu/AppUserMenu';
import AppNavMenu from '../AppNavMenu/AppNavMenu';
import {
  selectIsLoggedIn,
  selectUserName,
} from '../../../redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAPI } from '../../../redux/auth/operations';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const getInitials = name => {
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0];
    } else {
      return nameParts.map(part => part[0].toUpperCase()).join('');
    }
  };

  const displayName = userName ? getInitials(userName) : 'User';

  const handleLogout = () => {
    dispatch(logoutAPI());
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.wrapper}>
      <AppLogo />
      {isLoggedIn && (
        <div className={css.menuWrapper}>
          <AppUserMenu />
          <button className={css.burgerBtn} onClick={toggleMenu}>
            <Icon iconId="icon-burger" className={css.icon} />
          </button>
        </div>
      )}
      {isOpen && (
        <div ref={menuRef} className={css.mobileMenu}>
          <div className={css.userWrapper}>
            <p className={css.userName}>{displayName}</p>
            <div className={css.iconWrapper}>
              <Icon iconId="icon-user" className={css.iconUser} />
            </div>
          </div>
          <button className={css.closeBtn} onClick={toggleMenu}>
            <Icon iconId="icon-close" className={css.iconClose} />
          </button>
          <AppNavMenu toggleMenu={toggleMenu} />
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
