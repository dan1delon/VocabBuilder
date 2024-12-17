import css from './AppUserMenu.module.css';
import Icon from '../../../shared/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAPI } from '../../../redux/auth/operations';
import {
  selectIsLoggedIn,
  selectUserName,
} from '../../../redux/auth/selectors';

const AppUserMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  console.log(userName);

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
  };

  return (
    isLoggedIn && (
      <div className={css.wrapper}>
        <div className={css.userWrapper}>
          <p className={css.userName}>{displayName}</p>
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
