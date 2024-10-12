import Actions from '../Actions/Actions';
import Filters from '../Filters/Filters';
import Statistics from '../Statistics/Statistics';
import css from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={css.wrapper}>
      <Filters />
      <div className={css.statAndActWrapper}>
        <Statistics />
        <Actions />
      </div>
    </div>
  );
};

export default Dashboard;
