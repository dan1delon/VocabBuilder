import Dashboard from '../../components/DictionaryPage/Dashboard/Dashboard';
import WordsPagination from '../../components/DictionaryPage/WordsPagination/WordsPagination';
import WordsTable from '../../components/DictionaryPage/WordsTable/WordsTable';
import css from './DictionaryPage.module.css';

const DictionaryPage = () => {
  return (
    <div className={css.wrapper}>
      <Dashboard />
      <WordsTable />
      <WordsPagination />
    </div>
  );
};

export default DictionaryPage;
