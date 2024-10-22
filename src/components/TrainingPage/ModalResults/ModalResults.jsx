import { useSelector } from 'react-redux';
import css from './ModalResults.module.css';
import { selectTasksResults } from '../../../redux/words/selectors';

const ModalResults = () => {
  const answers = useSelector(selectTasksResults);

  const correctAnswers = answers.filter(answer => answer.isDone);
  const incorrectAnswers = answers.filter(answer => !answer.isDone);

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Well done</h3>
      <div className={css.resultsWrapper}>
        <div className={css.resultsCorrect}>
          <p className={css.correctParagraph}>Correct answers:</p>
          <ul className={css.correctList}>
            {correctAnswers.map((answer, index) => (
              <li className={css.correctItem} key={`${answer._id}-${index}`}>
                {answer.task === 'en' ? answer.en : answer.ua}
              </li>
            ))}
          </ul>
        </div>
        <div className={css.resultsMistakes}>
          <p className={css.mistakesParagraph}>Mistakes:</p>
          <ul className={css.mistakesList}>
            {incorrectAnswers.map((answer, index) => (
              <li className={css.mistakesItem} key={`${answer._id}-${index}`}>
                {answer.task === 'en' ? answer.en : answer.ua}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalResults;
