import { NavLink } from 'react-router-dom';
import css from './AppNavMenu.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { changePage, changeRecommendPage } from '../../../redux/words/slice';
import { useMediaQuery } from '@mui/material';

const AppNavMenu = ({ toggleMenu }) => {
  const dispatch = useDispatch();
  const desktop = useMediaQuery('(min-width:1440px)');

  const handleActiveLink = ({ isActive }) => {
    return clsx(css.link, { [css.active]: isActive });
  };

  const onDictionaryClick = () => {
    dispatch(changePage(1));
    if (!desktop) {
      toggleMenu();
    }
  };

  const onRecommendClick = () => {
    dispatch(changeRecommendPage(1));
    if (!desktop) {
      toggleMenu();
    }
  };

  const onTrainingClick = () => {
    if (!desktop) {
      toggleMenu();
    }
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
      <NavLink
        to="/training"
        className={handleActiveLink}
        onClick={onTrainingClick}
      >
        Training
      </NavLink>
    </nav>
  );
};

export default AppNavMenu;
