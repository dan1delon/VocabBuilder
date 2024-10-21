import { NavLink } from 'react-router-dom';
import css from './AppNavMenu.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { changePage, changeRecommendPage } from '../../../redux/words/slice';

const AppNavMenu = () => {
  const dispatch = useDispatch();

  const handleActiveLink = ({ isActive }) => {
    return clsx(css.link, { [css.active]: isActive });
  };

  const onDictionaryClick = () => {
    dispatch(changePage(1));
  };

  const onRecommendClick = () => {
    dispatch(changeRecommendPage(1));
  };

  return (
    <nav className={css.wrapper}>
      <NavLink
        to="/dictionary"
        className={handleActiveLink}
        onClick={onDictionaryClick}
      >
        Dictionary
      </NavLink>
      <NavLink
        to="/recommend"
        className={handleActiveLink}
        onClick={onRecommendClick}
      >
        Recommend
      </NavLink>
      <NavLink to="/training" className={handleActiveLink}>
        Training
      </NavLink>
    </nav>
  );
};

export default AppNavMenu;
