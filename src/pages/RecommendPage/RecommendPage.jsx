import Dashboard from '../../components/DictionaryPage/Dashboard/Dashboard';
import WordsTable from '../../components/DictionaryPage/WordsTable/WordsTable';
import WordsPagination from '../../components/DictionaryPage/WordsPagination/WordsPagination';
import css from './RecommendPage.module.css';

const RecommendPage = () => {
  return (
    <div className={css.wrapper}>
      <Dashboard />
      <WordsTable />
      <WordsPagination />
    </div>
  );
};

export default RecommendPage;
