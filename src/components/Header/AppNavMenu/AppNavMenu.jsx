import { NavLink } from 'react-router-dom';
import css from './AppNavMenu.module.css';
import clsx from 'clsx';

const AppNavMenu = () => {
  const handleActiveLink = ({ isActive }) => {
    return clsx(css.link, { [css.active]: isActive });
  };

  return (
    <nav className={css.wrapper}>
      <NavLink to="/dictionary" className={handleActiveLink}>
        Dictionary
      </NavLink>
      <NavLink to="/recommend" className={handleActiveLink}>
        Recommend
      </NavLink>
      <NavLink to="/training" className={handleActiveLink}>
        Training
      </NavLink>
    </nav>
  );
};

export default AppNavMenu;
