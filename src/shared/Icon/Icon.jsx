import clsx from 'clsx';
import { icon } from '../../icons';

const Icon = ({ iconId, className, ...props }) => {
  return (
    <svg className={clsx({ [className]: className })} role="img" {...props}>
      <use xlinkHref={`${icon}#${iconId}`} />
    </svg>
  );
};

export default Icon;
