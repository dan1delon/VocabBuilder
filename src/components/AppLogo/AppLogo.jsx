import css from './AppLogo.module.css';
import Icon from '../../shared/Icon/Icon';
import { NavLink } from 'react-router-dom';

const AppLogo = () => {
  return (
    <NavLink to="/" className={css.wrapper}>
      <Icon iconId="icon-logo" className={css.icon}></Icon>
      <p className={css.LogoText}>VocabBuilder</p>
    </NavLink>
  );
};

export default AppLogo;
