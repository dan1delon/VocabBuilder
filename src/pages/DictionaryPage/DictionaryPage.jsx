import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../../components/DictionaryPage/Dashboard/Dashboard';
import WordsPagination from '../../components/DictionaryPage/WordsPagination/WordsPagination';
import WordsTable from '../../components/DictionaryPage/WordsTable/WordsTable';
import Loader from '../../components/Loader/Loader';
import { selectIsLoading } from '../../redux/words/selectors';
import css from './DictionaryPage.module.css';
import { selectUsersWords } from '../../redux/words/selectors';
import EmptyTrainingLayout from '../../components/TrainingPage/EmptyTrainingLayout/EmptyTrainingLayout';
import { useModal } from '../../context';
import AddWordModal from '../../components/DictionaryPage/AddWordModal/AddWordModal';
import { useEffect } from 'react';
import { fetchUsersWords } from '../../redux/words/operations';

const DictionaryPage = () => {
  const loading = useSelector(selectIsLoading);
  const { openModal } = useModal();
  const words = useSelector(selectUsersWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersWords({ category: '', isIrregular: '' }));
  }, [dispatch]);

  const handleAddWord = () => {
    openModal(<AddWordModal />);
  };

  return (
    <div className={css.wrapper}>
      <Dashboard />
      {words.length === 0 ? (
        <EmptyTrainingLayout handleAddWord={handleAddWord} isDictionaryPage />
      ) : (
        <>
          <WordsTable />
          <WordsPagination />
        </>
      )}
    </div>
  );
};

export default DictionaryPage;
