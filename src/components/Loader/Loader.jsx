import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.background}>
      <Circles
        height="80"
        width="80"
        color="#85aa9f"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass={css.wrapper}
        visible={true}
      />
    </div>
  );
};

export default Loader;
