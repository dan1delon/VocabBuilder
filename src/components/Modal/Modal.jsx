import { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import css from './Modal.module.css';
import { useModal } from '../../context';
import Icon from '../../shared/Icon/Icon';
import { useNavigate, useLocation } from 'react-router-dom';

const Modal = ({ children }) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      disableBodyScroll(modalRef.current);
    }

    return () => {
      if (modalRef.current) {
        enableBodyScroll(modalRef.current);
      }
    };
  }, []);

  const handleCloseModal = e => {
    e.preventDefault();
    closeModal(e);

    if (location.pathname === '/training') {
      navigate('/dictionary');
    }
  };

  return (
    <div ref={modalRef} className={css.modalWrapper}>
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
