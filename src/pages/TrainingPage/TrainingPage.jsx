import css from './TrainingPage.module.css';
import TrainingRoom from '../../components/TrainingPage/TrainingRoom/TrainingRoom';
import ProgressBar from '../../components/DictionaryPage/ProgressBar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../redux/words/selectors';
import { useEffect, useState } from 'react';
import { fetchUsersTasks } from '../../redux/words/operations';
import EmptyTrainingLayout from '../../components/TrainingPage/EmptyTrainingLayout/EmptyTrainingLayout';
import AddWordModal from '../../components/DictionaryPage/AddWordModal/AddWordModal';
import { useModal } from '../../context';
import { useMediaQuery } from '@mui/material';

const TrainingPage = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const tasks = useSelector(selectTasks);

  const isMobile = useMediaQuery('(max-width:767px)');

  useEffect(() => {
    dispatch(fetchUsersTasks());
  }, []);

  const handleAddWord = () => {
    openModal(<AddWordModal />);
  };

  return (
    <div className={css.wrapper}>
      {tasks.length > 0 ? (
        <>
          <ProgressBar
            isMobile={isMobile}
            progress={userAnswers.length}
            total={tasks.length}
          />
          <TrainingRoom
            tasks={tasks}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        </>
      ) : (
        <EmptyTrainingLayout handleAddWord={handleAddWord} />
      )}
    </div>
  );
};

export default TrainingPage;
