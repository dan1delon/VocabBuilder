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
        className={css.imgMobile}
        loading="lazy"
        srcSet={`
          ${couple_mobile_1x_webp} 1x,
          ${couple_mobile_2x_webp} 2x,
          ${couple_mobile_1x_png} 1x,
          ${couple_mobile_2x_png} 2x
        `}
        src={couple_mobile_1x_png}
        alt="Learning couple"
        aria-label="Learning couple"
      />
      <img
        className={css.imgDesktop}
        loading="lazy"
        srcSet={`
          ${couple_1x_webp} 1x,
          ${couple_2x_webp} 2x,
          ${couple_1x_png} 1x,
          ${couple_2x_png} 2x
        `}
        src={couple_1x_png}
        alt="Learning couple"
        aria-label="Learning couple"
      />

      <ul className={css.textList}>
        {['Word', 'Translation', 'Grammar', 'Progress'].map((text, index) => (
          <li key={index} className={css.textItem}>
            <p className={css.text}>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WelcomeBanner;
