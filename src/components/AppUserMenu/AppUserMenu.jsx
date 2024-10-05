import css from './AppUserMenu.module.css';
import Icon from '../../shared/Icon/Icon';

const AppUserMenu = () => {
  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
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
  );
};

export default AppUserMenu;
