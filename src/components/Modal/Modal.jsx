import css from './Modal.module.css';
import { useModal } from '../../context';
import Icon from '../../shared/Icon/Icon';
import { useNavigate, useLocation } from 'react-router-dom';

const Modal = ({ children }) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseModal = e => {
    closeModal(e);
    if (location.pathname === '/training') {
      navigate('/dictionary');
    }
  };

  return (
    <div className={css.modalWrapper} aria-modal="true" role="dialog">
      <div className={css.modalContainer}>
        <button
          className={css.modalButtonClose}
          aria-label="close-modal-window-button"
          onClick={handleCloseModal}
        >
          <Icon iconId="icon-close" className={css.iconClose} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
