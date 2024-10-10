import { usePopover } from '../../../hooks/usePopover';
import css from './Filters.module.css';

const Filters = () => {
  const {
    isOpen,
    isVisible,
    popoverRef,
    handleTogglePopover,
    handleClosePopover,
    handleOutsideClick,
  } = usePopover();

  return <div className={css.wrapper}></div>;
};

export default Filters;
