import { NavLink } from 'react-router-dom';
import Icon from '../../../shared/Icon/Icon';
import css from './Actions.module.css';
import { useModal } from '../../../context';
import AddWordModal from '../AddWordModal/AddWordModal';

const Actions = () => {
  const { openModal } = useModal();

  const handleModalOpen = () => {
    openModal(<AddWordModal />);
  };

  return (
    <div className={css.wrapper}>
      <button type="button" className={css.Actions} onClick={handleModalOpen}>
        Add word
        <Icon iconId="icon-plus" className={css.icon}></Icon>
      </button>
      <NavLink to="/training" className={css.Actions}>
        Train oneself
        <Icon iconId="icon-arrow" className={css.icon}></Icon>
      </NavLink>
    </div>
  );
};

export default Actions;
