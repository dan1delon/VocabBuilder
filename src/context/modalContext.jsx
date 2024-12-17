import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';
import Modal from '../../src/components/Modal/Modal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const modalContext = createContext();
export const useModal = () => useContext(modalContext);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const backdropRef = useRef(null);

  const closeModal = useCallback(e => {
    if (
      (e && e.target === e.currentTarget) ||
      (e && e.code === 'Escape') ||
      (e && e.type === 'submit')
    ) {
      document.body.style.overflow = 'visible';
      enableBodyScroll(backdropRef.current);

      if (backdropRef.current) {
        backdropRef.current.style.opacity = 0;
        backdropRef.current.style.visibility = 'hidden';
      }

      setTimeout(() => {
        setModalContent(null);
      }, 300);
    }
  }, []);

  const openModal = content => {
    document.body.style.overflow = 'hidden';
    setModalContent(content);

    setTimeout(() => {
      if (backdropRef.current) {
        disableBodyScroll(backdropRef.current);
        backdropRef.current.style.opacity = 1;
        backdropRef.current.style.visibility = 'visible';
      }
    }, 10);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') closeModal(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  return (
    <modalContext.Provider value={{ modalContent, openModal, closeModal }}>
      {children}
      {modalContent &&
        createPortal(
          <div
            className={css.modalBackdrop}
            ref={backdropRef}
            onClick={closeModal}
          >
            <Modal>{modalContent}</Modal>
          </div>,
          document.querySelector('#modal-root')
        )}
    </modalContext.Provider>
  );
};
