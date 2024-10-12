import { NavLink } from 'react-router-dom';
import Icon from '../../../shared/Icon/Icon';
import css from './Actions.module.css';

const Actions = () => {
  return (
    <div className={css.wrapper}>
      <button type="button" className={css.Actions}>
        Add word
        <Icon iconId="icon-plus" className={css.icon}></Icon>
      </button>
      <NavLink to="/training" className={css.Actions}>
        Train oneself
        <Icon iconId="icon-arrow" className={css.icon}></Icon>
      </NavLink>
    </div>
  );
};

export default Actions;
