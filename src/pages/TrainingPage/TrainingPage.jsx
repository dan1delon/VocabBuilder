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
import { selectIsLoading } from '../../redux/categories/selectors';
import Loader from '../../components/Loader/Loader';

const TrainingPage = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectIsLoading);

  const isMobile = useMediaQuery('(max-width:767px)');

  useEffect(() => {
    dispatch(fetchUsersTasks());
    setProgress(userAnswers.length);
  }, [userAnswers, dispatch]);

  const handleAddWord = () => {
    openModal(<AddWordModal />);
  };

  return (
    <div className={css.wrapper}>
      {loading && <Loader />}
      {tasks.length > 0 ? (
        <>
          <ProgressBar
            isMobile={isMobile}
            progress={progress}
            total={tasks.length}
          />
          <TrainingRoom
            tasks={tasks}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            setProgress={setProgress}
          />
        </>
      ) : (
        <EmptyTrainingLayout handleAddWord={handleAddWord} />
      )}
    </div>
  );
};

export default TrainingPage;
