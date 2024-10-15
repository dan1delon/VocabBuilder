import { useDispatch } from 'react-redux';
import Dashboard from '../../components/DictionaryPage/Dashboard/Dashboard';
import WordsPagination from '../../components/DictionaryPage/WordsPagination/WordsPagination';
import WordsTable from '../../components/DictionaryPage/WordsTable/WordsTable';
import css from './DictionaryPage.module.css';
import { useEffect } from 'react';
import { fetchUsersWords } from '../../redux/words/operations';

const DictionaryPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersWords());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <Dashboard />
      <WordsTable />
      <WordsPagination />
    </div>
  );
};

export default DictionaryPage;
