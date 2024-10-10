import Actions from '../Actions/Actions';
import Filters from '../Filters/Filters';
import Statistics from '../Statistics/Statistics';

const Dashboard = () => {
  return (
    <div>
      <Filters />
      <Statistics />
      <Actions />
    </div>
  );
};

export default Dashboard;
