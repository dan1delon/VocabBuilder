import { useSelector } from 'react-redux';
import Dashboard from '../../components/DictionaryPage/Dashboard/Dashboard';
import WordsPagination from '../../components/DictionaryPage/WordsPagination/WordsPagination';
import WordsTable from '../../components/DictionaryPage/WordsTable/WordsTable';
import Loader from '../../components/Loader/Loader';
import { selectIsLoading } from '../../redux/categories/selectors';
import css from './DictionaryPage.module.css';

const DictionaryPage = () => {
  const loading = useSelector(selectIsLoading);

  return (
    <div className={css.wrapper}>
      {loading && <Loader />}
      <Dashboard />
      <WordsTable />
      <WordsPagination />
    </div>
  );
};

export default DictionaryPage;
