import { NavLink } from 'react-router-dom';
import css from './EmptyTrainingLayout.module.css';
import {
  report_1x_png,
  report_1x_webp,
  report_2x_png,
  report_2x_webp,
} from '../../../../public/img/index';

const EmptyTrainingLayout = ({ handleAddWord }) => {
  return (
    <div className={css.wrapper}>
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
            You don't have a single word to learn right now.
          </h4>
          <p className={css.paragraph}>
            Please create or add a word to start the workout. We want to improve
            your vocabulary and develop your knowledge, so please share the
            words you are interested in adding to your study.
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
          <NavLink to="/dictionary" className={css.cancelLink}>
            Cancel
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EmptyTrainingLayout;
