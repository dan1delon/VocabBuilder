import { useDispatch, useSelector } from 'react-redux';
import css from './Statistics.module.css';
import {
  selectStatistics,
  selectUsersWords,
} from '../../../redux/words/selectors';
import { useEffect } from 'react';
import { fetchStatistics } from '../../../redux/words/operations';

const Statistics = () => {
  const totalCount = useSelector(selectStatistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <p className={css.paragraph}>To study:</p>
      <span className={css.span}>{totalCount}</span>
    </div>
  );
};

export default Statistics;
