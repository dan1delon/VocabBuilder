import css from './Modal.module.css';
import { useModal } from '../../context';
import Icon from '../../shared/Icon/Icon';

const Modal = ({ children }) => {
  const { closeModal } = useModal();

  return (
    <div className={css.modalWrapper} onClick={closeModal}>
      <div className={css.modalContainer}>
        <button
          className={css.modalButtonClose}
          onClick={closeModal}
          aria-label="close-modal-window-button"
        >
          <Icon
            iconId="icon-close"
            className={css.iconClose}
            onClick={closeModal}
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
