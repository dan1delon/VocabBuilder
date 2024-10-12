import { useDispatch, useSelector } from 'react-redux';
import css from './Statistics.module.css';
import { useEffect } from 'react';
import { fetchStatistics } from '../../../redux/words/operations';
import { selectStatistics } from '../../../redux/words/selectors';

const Statistics = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectStatistics);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <p className={css.paragraph}>To study:</p>
      <span className={css.span}>{totalCount || 0}</span>
    </div>
  );
};

export default Statistics;
