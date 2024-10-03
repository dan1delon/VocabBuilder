import { Triangle } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.background}>
      <Triangle
        visible={true}
        height="120"
        width="120"
        color="#0081CF"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass={css.wrapper}
      />
    </div>
  );
};

export default Loader;
