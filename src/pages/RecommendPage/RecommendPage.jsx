import Dashboard from '../../components/DictionaryPage/Dashboard/Dashboard';
import WordsTable from '../../components/DictionaryPage/WordsTable/WordsTable';
import WordsPagination from '../../components/DictionaryPage/WordsPagination/WordsPagination';
import css from './RecommendPage.module.css';
import Loader from '../../components/Loader/Loader';
import { selectWordsLoading } from '../../redux/words/selectors';
import { useSelector } from 'react-redux';

const RecommendPage = () => {
  const loading = useSelector(selectWordsLoading);

  return (
    <div className={css.wrapper}>
      {loading && <Loader />}
      <Dashboard />
      <WordsTable />
      <WordsPagination />
    </div>
  );
};

export default RecommendPage;
