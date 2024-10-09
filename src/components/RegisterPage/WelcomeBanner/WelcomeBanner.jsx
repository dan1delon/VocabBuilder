import {
  couple_1x_png,
  couple_1x_webp,
  couple_2x_png,
  couple_2x_webp,
  couple_mobile_1x_png,
  couple_mobile_1x_webp,
  couple_mobile_2x_png,
  couple_mobile_2x_webp,
} from '../../../../public/img';
import css from './WelcomeBanner.module.css';

const WelcomeBanner = () => {
  return (
    <div className={css.wrapper}>
      <img
        className={css.img}
        loading="lazy"
        srcSet={`
          ${couple_mobile_1x_webp} 1x,
          ${couple_mobile_2x_webp} 2x,
          ${couple_mobile_1x_png} 1x,
          ${couple_mobile_2x_png} 2x,
        `}
        src={couple_1x_png}
        alt="learning couple"
      />

      <ul className={css.textList}>
        <li className={css.textItem}>
          <p className={css.text}>Word</p>
        </li>
        <li className={css.textItem}>
          <p className={css.text}>Translation</p>
        </li>
        <li className={css.textItem}>
          <p className={css.text}>Grammar</p>
        </li>
        <li className={css.textItem}>
          <p className={css.text}>Progress</p>
        </li>
      </ul>
    </div>
  );
};

export default WelcomeBanner;
