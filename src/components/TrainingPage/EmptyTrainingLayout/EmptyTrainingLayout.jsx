import { NavLink } from 'react-router-dom';
import css from './EmptyTrainingLayout.module.css';
import {
  report_1x_png,
  report_1x_webp,
  report_2x_png,
  report_2x_webp,
} from '../../../../public/img/index';
import clsx from 'clsx';

const EmptyTrainingLayout = ({ handleAddWord, isDictionaryPage = false }) => {
  return (
    <div
      className={clsx(css.wrapper, { [css.dictionaryPage]: isDictionaryPage })}
    >
      <img
        className={css.img}
        loading="lazy"
        srcSet={`
          ${report_1x_webp} 1x,
          ${report_2x_webp} 2x,
          ${report_1x_png} 1x,
          ${report_2x_png} 2x
        `}
        src={report_1x_png}
        alt="Report"
      />
      <div className={css.textAndBtnWrapper}>
        <div className={css.textWrapper}>
          <h4 className={css.title}>
            Your dictionary is empty – let’s fix that!
          </h4>
          <p className={css.paragraph}>
            Add a new word to get started on your learning journey. The more
            words you add, the better your vocabulary grows. Think of a word you
            want to master, and let's make it part of your study list today!
          </p>
        </div>
        <div className={css.btnWrapper}>
          <NavLink
            to="/dictionary"
            className={css.addLink}
            onClick={handleAddWord}
          >
            Add
          </NavLink>
          {!isDictionaryPage && (
            <NavLink to="/dictionary" className={css.cancelLink}>
              Cancel
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyTrainingLayout;
