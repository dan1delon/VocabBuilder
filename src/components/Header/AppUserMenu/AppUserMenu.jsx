import css from './AppUserMenu.module.css';
import Icon from '../../../shared/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAPI } from '../../../redux/auth/operations';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

const AppUserMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAPI());
  };

  return (
    isLoggedIn && (
      <div className={css.wrapper}>
        <div className={css.userWrapper}>
          <p className={css.userName}>User</p>
          <div className={css.iconWrapper}>
            <Icon iconId="icon-user" className={css.iconUser} />
          </div>
        </div>
        <button type="button" className={css.button} onClick={handleLogout}>
          Log out
          <Icon iconId="icon-arrow" className={css.iconArrow}></Icon>
        </button>
      </div>
    )
  );
};

export default AppUserMenu;
